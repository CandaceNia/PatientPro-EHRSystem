const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'password123', 
  database: 'medrecords' 
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});


// Get all patients
app.get('/patients', (req, res) => {
  connection.query('SELECT * FROM patients', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  });
});

// Get a specific patient by ID
app.get('/patients/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM patients WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length === 0) {
      res.status(404).send({ message: 'Patient not found' });
    } else {
      res.send(results[0]);
    }
  });
});

// Add a new patient
app.post('/patients', (req, res) => {
  const { name } = req.body;
  connection.query('INSERT INTO patients (name) VALUES (?)', [name], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send({ id: result.insertId, name });
    }
  });
});

// Update a patient
app.put('/patients/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  connection.query('UPDATE patients SET name = ? WHERE id = ?', [name, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.affectedRows === 0) {
      res.status(404).send({ message: 'Patient not found' });
    } else {
      res.send({ id, name });
    }
  });
});

// Delete a patient
app.delete('/patients/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM patients WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.affectedRows === 0) {
      res.status(404).send({ message: 'Patient not found' });
    } else {
      res.send({ message: 'Patient deleted' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
