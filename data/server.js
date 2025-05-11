require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { DB_HOST, DB_NAME, DB_USER, DB_PASS, PORT, IP, JWT_SECRET } = require('./dbconfig');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    message: 'All fields are required' }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, results) => {
      if (err) {
        console.error('Signup error:', err);
        return res.status(500).json({ message: 'User already exists or DB error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (err) {
json({ message: 'Server error' });
  }
});

// Login route
app.post('/login', (req, res) => {
  console.log("logging in...")
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  });
});

// Contacts routes
app.get('/contacts', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM contacts';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching contacts:', err);
      res.status(500).send('Error fetching contacts');
      return;
    }
    res.json(results);
  });
});

app.post('/addContacts', authenticateToken, (req, res) => {
  const { id, name, phone } = req.body;
  const query = 'INSERT INTO contacts (id, name, phone) VALUES (?, ?, ?)';
  db.query(query, [id, name, phone], (err, results) => {
    if (err) {
      console.error('Error adding contact:', err);
      res.status(500).send('Error adding contact');
      return;
    }
    res.status(201).send('Contact added successfully');
  });
});

app.delete('/deleteContact', authenticateToken, (req, res) => {
  const id = req.header('id');
  if (!id) {
    res.status(400).send('id is required in the header');
    return;
  }

  const query = 'DELETE FROM contacts WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting contact:', err);
      res.status(500).send('Error deleting contact');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('Contact not found');
    } else {
      res.status(200).send('Contact deleted successfully');
    }
  });
});

// Feedback routes
app.get('/getidCount', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM feedback';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching id count:', err);
      res.status(500).send('Error fetching id count');
      return;
    }
    res.json(results[0].count + 1);
  });
});

app.post('/feedback', (req, res) => {
  const { id, location_name, addresstype, experience, safety_level, lat, lon, info } = req.body;
  const query = 'INSERT INTO feedback (id, location_name, type, experience, safety_level, lat, lon, info) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [id, location_name, addresstype, experience, safety_level, lat, lon, info], (err, results) => {
    if (err) {
      console.error('Error adding feedback:', err);
      res.status(500).send('Error adding feedback');
      return;
    }
    res.status(201).send('Feedback added successfully');
  });
});

// Location safety info
app.get('/getSafetyInfo', (req, res) => {
  const { location_name } = req.query;
  if (!location_name) {
    return res.status(400).send('location_name is required');
  }

  const query = 'SELECT * FROM locations WHERE location_name LIKE ?';
  db.query(query, [location_name], (err, results) => {
    if (err) {
      console.error('Error fetching safety level:', err);
      res.status(500).send('Error fetching safety level');
      return;
    }
    if (results.length === 0) {
      return res.status(404).send('Location not found');
    }
    res.json(results[0]);
  });
});

// Start server
app.listen(PORT, IP, () => {
  console.log(`Server is running on http://${IP}:${PORT}`);
});
