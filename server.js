// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // replace with your MySQL password
  database: 'todo_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database.');
});

// Create tasks table if not exists
db.query(`CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT
)`, (err) => {
  if (err) throw err;
});

// Routes for accessing the database where we can get, post, put and delete tasks!!!!
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).send('Title is required');
  db.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId });
  });
});

app.put('/tasks/:id', (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  if (!title) return res.status(400).send('Title is required');
  db.query('UPDATE tasks SET title = ?, description = ? WHERE id = ?', [title, description, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
