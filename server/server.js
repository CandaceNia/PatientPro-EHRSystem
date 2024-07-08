// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: 'password', // your MySQL password
  database: 'medrecords' // your database name
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.get('/records', (req, res) => {
  db.query('SELECT * FROM records', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/records', (req, res) => {
  const { name, age, diagnosis } = req.body;
  db.query('INSERT INTO records (name, age, diagnosis) VALUES (?, ?, ?)', [name, age, diagnosis], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId });
  });
});

app.put('/records/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, diagnosis } = req.body;
  db.query('UPDATE records SET name = ?, age = ?, diagnosis = ? WHERE id = ?', [name, age, diagnosis, id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.delete('/records/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM records WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
