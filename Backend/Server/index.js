const express = require('express');
const cors    = require('cors');
const pool    = require('./db');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/subscriptions', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM subscriptions ORDER BY created_at DESC');
  res.json(rows);
});

app.post('/api/subscriptions', async (req, res) => {
  const { name, price, currency, billing, category } = req.body;
  const [result] = await pool.query(
    'INSERT INTO subscriptions (name, price, currency, billing, category) VALUES (?, ?, ?, ?, ?)',
    [name, price, currency || 'INR', billing || 'monthly', category || 'entertainment']
  );
  const [rows] = await pool.query('SELECT * FROM subscriptions WHERE id = ?', [result.insertId]);
  res.status(201).json(rows[0]);
});

app.put('/api/subscriptions/:id', async (req, res) => {
  const { name, price, currency, billing, category } = req.body;
  await pool.query(
    'UPDATE subscriptions SET name=?, price=?, currency=?, billing=?, category=? WHERE id=?',
    [name, price, currency, billing, category, req.params.id]
  );
  const [rows] = await pool.query('SELECT * FROM subscriptions WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

app.delete('/api/subscriptions/:id', async (req, res) => {
  await pool.query('DELETE FROM subscriptions WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

app.delete('/api/subscriptions', async (req, res) => {
  await pool.query('DELETE FROM subscriptions');
  res.json({ success: true });
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`SubTax API running on :${process.env.PORT || 5000}`)
);