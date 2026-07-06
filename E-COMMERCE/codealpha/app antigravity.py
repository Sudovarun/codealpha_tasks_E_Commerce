import os
import sqlite3
import jwt
import time
import bcrypt
from datetime import datetime, timedelta
from typing import List, Optional, Any
from fastapi import FastAPI, HTTPException, Depends, Header, Request, Body
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# --- Database Config ---
DB_PATH = os.path.join(os.path.dirname(__file__), "database.sqlite")
JWT_SECRET = "novatech-super-secret-key-123456"

app = FastAPI(title="NovaTech Ecommerce API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Schemas ---
class UserRegister(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class OrderItem(BaseModel):
    productId: int
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItem]
    shippingAddress: str

# --- DB Helpers ---
def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def db_get(query: str, params: tuple = ()):
    conn = get_db_connection()
    row = conn.execute(query, params).fetchone()
    conn.close()
    return dict(row) if row else None

def db_all(query: str, params: tuple = ()):
    conn = get_db_connection()
    rows = conn.execute(query, params).fetchall()
    conn.close()
    return [dict(row) for row in rows]

def db_run(query: str, params: tuple = ()):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(query, params)
    conn.commit()
    last_id = cursor.lastrowid
    conn.close()
    return last_id

# --- Auth Helper ---
def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Access token required")
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload
    except Exception:
        raise HTTPException(status_code=403, detail="Invalid or expired token")

# --- Routes ---

@app.post("/api/auth/register")
async def register(user: UserRegister):
    existing = db_get("SELECT id FROM users WHERE username = ? OR email = ?", (user.username, user.email))
    if existing:
        raise HTTPException(status_code=400, detail="Username or email already in use")
    
    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(user.password.encode('utf-8'), salt).decode('utf-8')
    
    user_id = db_run("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)", 
                    (user.username, user.email, password_hash))
    
    token = jwt.encode({"id": user_id, "username": user.username, "email": user.email, "exp": datetime.utcnow() + timedelta(hours=1)}, JWT_SECRET)
    
    return {
        "message": "User registered successfully",
        "token": token,
        "user": {"id": user_id, "username": user.username, "email": user.email}
    }

@app.post("/api/auth/login")
async def login(user: UserLogin):
    db_user = db_get("SELECT * FROM users WHERE email = ?", (user.email,))
    if not db_user or not bcrypt.checkpw(user.password.encode('utf-8'), db_user['password_hash'].encode('utf-8')):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    token = jwt.encode({"id": db_user['id'], "username": db_user['username'], "email": db_user['email'], "exp": datetime.utcnow() + timedelta(hours=1)}, JWT_SECRET)
    
    return {
        "message": "Logged in successfully",
        "token": token,
        "user": {"id": db_user['id'], "username": db_user['username'], "email": db_user['email']}
    }

@app.get("/api/auth/me")
async def me(user: dict = Depends(get_current_user)):
    db_user = db_get("SELECT id, username, email, created_at FROM users WHERE id = ?", (user['id'],))
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user": db_user}

@app.get("/api/products")
async def get_products(category: Optional[str] = None):
    if category:
        products = db_all("SELECT * FROM products WHERE category = ?", (category,))
    else:
        products = db_all("SELECT * FROM products")
    return {"products": products}

@app.get("/api/products/{product_id}")
async def get_product(product_id: int):
    product = db_get("SELECT * FROM products WHERE id = ?", (product_id,))
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"product": product}

@app.post("/api/orders")
async def place_order(order: OrderCreate, user: dict = Depends(get_current_user)):
    total_amount = 0
    validated_items = []
    
    for item in order.items:
        product = db_get("SELECT * FROM products WHERE id = ?", (item.productId,))
        if not product:
            raise HTTPException(status_code=404, detail=f"Product with ID {item.productId} not found")
        if product['stock'] < item.quantity:
            raise HTTPException(status_code=400, detail=f"Insufficient stock for product: {product['name']}")
        
        total_amount += product['price'] * item.quantity
        validated_items.append({"product": product, "quantity": item.quantity, "price": product['price']})
    
    # Bundle discount
    has_kb = any(i['product']['id'] == 1 for i in validated_items)
    has_mon = any(i['product']['id'] == 3 for i in validated_items)
    has_util = any(i['product']['id'] in [5, 6] for i in validated_items)
    
    discount = 1500 if (has_kb and has_mon and has_util) else 0
    subtotal = max(0, total_amount - discount)
    shipping = 0 if (subtotal >= 2000 or subtotal == 0) else 150
    final_total = subtotal + shipping
    
    order_id = db_run("INSERT INTO orders (user_id, total_amount, shipping_address, status) VALUES (?, ?, ?, ?)",
                      (user['id'], final_total, order.shippingAddress, 'Processing'))
    
    for item in validated_items:
        db_run("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
               (order_id, item['product']['id'], item['quantity'], item['price']))
        db_run("UPDATE products SET stock = ? WHERE id = ?", (item['product']['stock'] - item['quantity'], item['product']['id']))
    
    return {"message": "Order processed successfully", "orderId": order_id, "totalAmount": final_total, "status": "Processing"}

@app.get("/api/orders")
async def get_orders(user: dict = Depends(get_current_user)):
    orders = db_all("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC", (user['id'],))
    result = []
    for order in orders:
        items = db_all("""
            SELECT oi.*, p.name as product_name, p.image_url 
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?
        """, (order['id'],))
        order_dict = dict(order)
        order_dict['items'] = items
        result.append(order_dict)
    return {"orders": result}

# --- Serve Static Files ---
app.mount("/", StaticFiles(directory="public", html=True), name="public")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=3000)
