const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { initDatabase, dbRun, dbGet, dbAll } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'novatech-super-secret-key-123456';

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// --- API ROUTES ---

// 1. Auth: Register
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields (username, email, password) are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await dbGet('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already in use' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Save user
    const result = await dbRun(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, passwordHash]
    );

    // Generate JWT
    const token = jwt.sign({ id: result.id, username, email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: result.id, username, email }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// 2. Auth: Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find user
    const user = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Logged in successfully',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// 3. Auth: Current User Profile
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await dbGet('SELECT id, username, email, created_at FROM users WHERE id = ?', [req.user.id]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Fetch profile error:', error);
    res.status(500).json({ error: 'Server error fetching user profile' });
  }
});

// 4. Products: List All (optional category filter)
app.get('/api/products', async (req, res) => {
  const { category } = req.query;
  try {
    let products;
    if (category) {
      products = await dbAll('SELECT * FROM products WHERE category = ?', [category]);
    } else {
      products = await dbAll('SELECT * FROM products');
    }
    res.json({ products });
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ error: 'Server error fetching products' });
  }
});

// 5. Products: Single Details
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await dbGet('SELECT * FROM products WHERE id = ?', [id]);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ product });
  } catch (error) {
    console.error('Fetch product detail error:', error);
    res.status(500).json({ error: 'Server error fetching product detail' });
  }
});

// 6. Orders: Place Order
app.post('/api/orders', authenticateToken, async (req, res) => {
  const { items, shippingAddress } = req.body; // items: [{ productId, quantity }]

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item' });
  }
  if (!shippingAddress || shippingAddress.trim() === '') {
    return res.status(400).json({ error: 'Shipping address is required' });
  }

  try {
    // 1. Validate all products and calculate total amount
    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await dbGet('SELECT * FROM products WHERE id = ?', [item.productId]);
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for product: ${product.name} (Available: ${product.stock}, Ordered: ${item.quantity})` });
      }

      totalAmount += product.price * item.quantity;
      validatedItems.push({
        product,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Check if order qualifies for the workspace bundle discount (at least one Keyboard: id 1, one Monitor: id 3, and one Utility: id 5 or 6)
    const hasKeyboard = validatedItems.some(item => item.product.id === 1);
    const hasMonitor = validatedItems.some(item => item.product.id === 3);
    const hasUtility = validatedItems.some(item => item.product.id === 5 || item.product.id === 6);

    let discount = 0;
    if (hasKeyboard && hasMonitor && hasUtility) {
      discount = 1500;
    }

    let subtotalAfterDiscount = Math.max(0, totalAmount - discount);
    let shipping = (subtotalAfterDiscount >= 2000 || subtotalAfterDiscount === 0) ? 0 : 150.00;
    let finalTotalAmount = subtotalAfterDiscount + shipping;

    // 2. Perform order insertion and stock reduction
    // Using a manual transaction flow
    await dbRun('BEGIN TRANSACTION');

    try {
      // Create order record
      const orderResult = await dbRun(
        'INSERT INTO orders (user_id, total_amount, shipping_address, status) VALUES (?, ?, ?, ?)',
        [req.user.id, finalTotalAmount, shippingAddress, 'Processing']
      );
      const orderId = orderResult.id;

      // Create order items and decrement product stocks
      for (const item of validatedItems) {
        // Insert order item
        await dbRun(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.product.id, item.quantity, item.price]
        );

        // Update product stock
        const newStock = item.product.stock - item.quantity;
        await dbRun('UPDATE products SET stock = ? WHERE id = ?', [newStock, item.product.id]);
      }

      await dbRun('COMMIT');

      res.status(201).json({
        message: 'Order processed successfully',
        orderId,
        totalAmount,
        status: 'Processing'
      });
    } catch (txError) {
      await dbRun('ROLLBACK');
      throw txError;
    }
  } catch (error) {
    console.error('Order processing error:', error);
    res.status(500).json({ error: 'Server error processing your order' });
  }
});

// 7. Orders: Get History
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    // Get orders
    const orders = await dbAll('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    
    // For each order, fetch items
    const ordersWithItems = [];
    for (const order of orders) {
      const items = await dbAll(`
        SELECT oi.*, p.name as product_name, p.image_url 
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `, [order.id]);
      
      ordersWithItems.push({
        ...order,
        items
      });
    }
    
    res.json({ orders: ordersWithItems });
  } catch (error) {
    console.error('Fetch order history error:', error);
    res.status(500).json({ error: 'Server error fetching order history' });
  }
});

// Catch-all route to serve SPA for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Centralized Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.stack);
  res.status(500).json({ error: 'Something went wrong internally!' });
});

// Start server after database initialization
const startServer = async () => {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize database and start server:', err);
    process.exit(1);
  }
};

startServer();
