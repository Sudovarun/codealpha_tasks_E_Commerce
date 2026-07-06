const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Promise-based helpers for database interactions
const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Initialize the database and tables
const initDatabase = async () => {
  // Enable foreign keys
  await dbRun('PRAGMA foreign_keys = ON');

  // Create Users table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create Products table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      image_url TEXT NOT NULL,
      category TEXT NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      rating REAL NOT NULL DEFAULT 5.0,
      review_count INTEGER NOT NULL DEFAULT 0,
      specifications TEXT,
      options TEXT
    )
  `);

  // Create Orders table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total_amount REAL NOT NULL,
      status TEXT DEFAULT 'Pending',
      shipping_address TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Create Order Items table
  await dbRun(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
    )
  `);

  // Seed Products if table is empty
  const productCount = await dbGet('SELECT COUNT(*) AS count FROM products');
  if (productCount.count === 0) {
    const mockProducts = [
      {
        name: "NovaTech KB-75 Mechanical Keyboard",
        description: "We built the KB-75 because we were tired of mushy office boards. Crafted with an anodized aluminum deck, hot-swappable brown tactile switches, and double-shot PBT keycaps, this keyboard survives 12-hour coding sessions and looks great doing it.",
        price: 9499.00,
        image_url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80",
        category: "Peripherals",
        stock: 4,
        rating: 4.8,
        review_count: 142,
        specifications: JSON.stringify({
          "Layout": "75% ANSI Layout (84 Keys)",
          "Switches": "NovaTech tactile brown (hot-swappable) (A satisfying 'clack' without deafening your housemates)",
          "Keycaps": "Double-shot PBT, Cherry profile",
          "Cable": "Detachable coiled USB-C to USB-A (1.8m)",
          "Backlight": "16.8 Million Colors Per-Key RGB (For coding at 3 AM in complete style)"
        }),
        options: JSON.stringify({
          "switches": ["Tactile Brown", "Linear Red", "Clicky Blue"],
          "colors": ["Obsidian Black", "Arctic White"]
        })
      },
      {
        name: "NovaSound Studio-1 ANC Headphones",
        description: "Zero distractions. Studio-1 features hybrid active noise cancellation that blocks out low-frequency background noise (like that office hum) while keeping acoustics crisp. A fast USB-C charge in 15 minutes gets you 4 hours of playback.",
        price: 18999.00,
        image_url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80",
        category: "Audio",
        stock: 15,
        rating: 4.9,
        review_count: 95,
        specifications: JSON.stringify({
          "Drivers": "40mm custom dynamic neodymium drivers",
          "Noise Cancellation": "Hybrid ANC up to 38dB depth (Blocks out the office hum so you can actually think)",
          "Battery Life": "40 hours (ANC On) | 55 hours (ANC Off) (Enough juice to survive a double shift)",
          "Connectivity": "Bluetooth v5.2, LDAC High-Res, AAC, SBC",
          "Charging": "Fast charging via USB-C (15m = 4h)"
        }),
        options: JSON.stringify({
          "colors": ["Matte Black", "Cosmic Gray"]
        })
      },
      {
        name: "Horizon Curv-34 UltraWide Curved Monitor",
        description: "34 inches of panoramic curved screen designed for serious multi-tasking. Fit three full IDE files side-by-side without squinting. The 144Hz refresh rate means smooth text scrolling, and the smart monitor height adjustment saves your neck.",
        price: 38999.00,
        image_url: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80",
        category: "Displays",
        stock: 2,
        rating: 4.7,
        review_count: 54,
        specifications: JSON.stringify({
          "Panel Size": "34-inch 21:9 Curved VA Panel (Immersive widescreen format that is easy on the eyes)",
          "Resolution": "UWQHD (3440 x 1440 pixels) (Fit three full IDE files side-by-side without squinting)",
          "Refresh Rate": "144Hz with 1ms MPRT response",
          "Curvature": "1500R curved screen radius",
          "Ports": "2x HDMI 2.0, 2x DisplayPort 1.4, 1x Headphone Jack"
        }),
        options: JSON.stringify({
          "colors": ["Stealth Black"]
        })
      },
      {
        name: "Apex Precision Wireless Mouse (Model G)",
        description: "We shaved off every gram of unnecessary weight. At 68g, the Model G wireless mouse is light on your wrist and glides with zero latency. Built with an optical sensor for pixel-perfect tracking and a battery that survives 80 hours between charges.",
        price: 5499.00,
        image_url: "https://images.unsplash.com/photo-1625842268584-8f329024f67a?auto=format&fit=crop&w=600&q=80",
        category: "Peripherals",
        stock: 35,
        rating: 4.6,
        review_count: 120,
        specifications: JSON.stringify({
          "Weight": "68g ultra-lightweight chassis (Feels like nothing in your hand, light on your wrist)",
          "Sensor": "Apex Focus Pro 20K optical sensor",
          "DPI Range": "100 - 20,000 DPI adjustable",
          "Battery Life": "Up to 80 hours of active gaming (Survives weeks of daily work without a recharge)",
          "Switches": "Optical Mouse Switches Gen-3 (90 Million clicks)"
        }),
        options: JSON.stringify({
          "colors": ["Matte Black", "Arctic White"]
        })
      },
      {
        name: "Veloce Commuter Tech Pack (v2)",
        description: "Designed by developers who commute. Water-resistant ballistic nylon keeps your electronics dry, and a suspended laptop compartment ensures your machine never hits the floor. Includes hidden cable organizers and charging pass-through pockets.",
        price: 6499.00,
        image_url: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80",
        category: "Lifestyle",
        stock: 40,
        rating: 4.5,
        review_count: 85,
        specifications: JSON.stringify({
          "Capacity": "22 Liters volume capacity",
          "Material": "1680D Water-resistant Ballistic Nylon",
          "Device Support": "Suspended padded sleeve (fits up to 16\" laptops)",
          "Zippers": "YKK AquaGuard weatherproof zip sliders",
          "Dimensions": "48 cm x 32 cm x 18 cm"
        }),
        options: JSON.stringify({
          "colors": ["Obsidian Black", "Lunar Gray"]
        })
      },
      {
        name: "Lumina Monitor Lightbar (Model L-1)",
        description: "Typing in the dark kills your eyes. The Lumina lightbar illuminates your desk surface using an asymmetrical optical light beam that prevents glare on curved or flat screens. Adjust color temperature dynamically to match your time of night.",
        price: 3499.00,
        image_url: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=600&q=80",
        category: "Lifestyle",
        stock: 50,
        rating: 4.7,
        review_count: 62,
        specifications: JSON.stringify({
          "Power Source": "5V USB powered (detachable USB-C)",
          "Light Design": "Asymmetrical projection (Zero glare on your screen, only lights up your keys)",
          "Color Temp": "2700K (Warm) - 6500K (Cool) adjustable (Warm midnight amber to cool white daylight)",
          "Controls": "Smart Touch dimming & color toggle sensors",
          "Clamp Design": "Counterweight clamp fits flat/curved bezels"
        }),
        options: JSON.stringify({
          "colors": ["Midnight Silver"]
        })
      }
    ];

    const insertQuery = `
      INSERT INTO products (name, description, price, image_url, category, stock, rating, review_count, specifications, options)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (const p of mockProducts) {
      await dbRun(insertQuery, [p.name, p.description, p.price, p.image_url, p.category, p.stock, p.rating, p.review_count, p.specifications, p.options]);
    }
    console.log("Mock products seeded successfully!");
  }
};

module.exports = {
  dbRun,
  dbGet,
  dbAll,
  initDatabase,
  db
};
