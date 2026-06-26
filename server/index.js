const express = require('express');
const cors    = require('cors');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const pool    = require('./db');
require('dotenv').config();

const app    = express();
const SECRET = process.env.JWT_SECRET || 'subtax_secret_key';

app.use(cors());
app.use(express.json());

// ── Auth middleware ──────────────────────────────────────────
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ── REGISTER ─────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password, role, language } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length) return res.status(409).json({ error: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, phone, password, role, language) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone || null, hash, role || 'user', language || 'English']
    );
    const token = jwt.sign({ id: result.insertId, email, name }, SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: result.insertId, name, email, phone, role, language, avatarUrl: '' } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── LOGIN ────────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ error: 'No account found with this email' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Wrong password' });

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, language: user.language, avatarUrl: user.avatar_url || '' } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── SUBSCRIPTIONS (protected) ────────────────────────────────
app.get('/api/subscriptions', auth, async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM subscriptions WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
  res.json(rows);
});

app.post('/api/subscriptions', auth, async (req, res) => {
  const { name, price, currency, billing, category } = req.body;
  const [result] = await pool.query(
    'INSERT INTO subscriptions (name, price, currency, billing, category, user_id) VALUES (?, ?, ?, ?, ?, ?)',
    [name, price, currency || 'INR', billing || 'monthly', category || 'entertainment', req.user.id]
  );
  const [rows] = await pool.query('SELECT * FROM subscriptions WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
});

app.put('/api/subscriptions/:id', auth, async (req, res) => {
  const { name, price, currency, billing, category } = req.body;
  await pool.query(
    'UPDATE subscriptions SET name=?, price=?, currency=?, billing=?, category=? WHERE id=? AND user_id=?',
    [name, price, currency, billing, category, req.params.id, req.user.id]
  );
  const [rows] = await pool.query('SELECT * FROM subscriptions WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

app.delete('/api/subscriptions/:id', auth, async (req, res) => {
  await pool.query('DELETE FROM subscriptions WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
  res.json({ success: true });
});

app.delete('/api/subscriptions', auth, async (req, res) => {
  await pool.query('DELETE FROM subscriptions WHERE user_id = ?', [req.user.id]);
  res.json({ success: true });
});

app.listen(process.env.PORT || 3001, () =>
  console.log(`SubTax API running on :${process.env.PORT || 3001}`)
);
