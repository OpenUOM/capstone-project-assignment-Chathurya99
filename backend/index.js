const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Create database connection
const db = new sqlite3.Database(':memory:');

// Create student table
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS student (id INT, name TEXT, age INT, hometown TEXT, religion TEXT)');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add a new student
app.post('/addStudent', (req, res) => {
  const { id, name, age, hometown, religion } = req.body;

  db.run(
    'INSERT INTO student (id, name, age, hometown, religion) VALUES (?, ?, ?, ?, ?)',
    [id, name, age, hometown, religion],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Failed to add student.');
      }
      console.log('A new student has been added with ID:', this.lastID);
      return res.status(200).send('Student added successfully.');
    }
  );
});

// Edit a student
app.post('/editStudent', (req, res) => {
  const { id, name, age, hometown, religion } = req.body;

  db.run(
    'UPDATE student SET name = ?, age = ?, hometown = ?, religion = ? WHERE id = ?',
    [name, age, hometown, religion, id],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Failed to edit student.');
      }
      console.log('Student with ID', id, 'has been updated.');
      return res.status(200).send('Student edited successfully.');
    }
  );
});

// Delete a student
app.post('/deleteStudent', (req, res) => {
  const { id } = req.body;

  db.run('DELETE FROM student WHERE id = ?', [id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Failed to delete student.');
    }
    console.log('Student with ID', id, 'has been deleted.');
    return res.status(200).send('Student deleted successfully.');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
