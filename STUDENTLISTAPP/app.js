const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');

const app = express();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'RP738964$',
    database: 'c237_studentlistapp'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Set up view engine
app.set('view engine', 'ejs');

// Enable static files
app.use(express.static('public'));

// Enable form processing
app.use(express.urlencoded({ extended: false }));

// Display all students
app.get('/', (req, res) => {

    const sql = 'SELECT * FROM student';

    connection.query(sql, (error, results) => {

        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error retrieving students');
        }

        res.render('index', { students: results });

    });

});

// Display one student
app.get('/student/:id', (req, res) => {

    const studentId = req.params.id;

    const sql = 'SELECT * FROM student WHERE studentId = ?';

    connection.query(sql, [studentId], (error, results) => {

        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error retrieving student');
        }

        if (results.length > 0) {
            res.render('student', { student: results[0] });
        } else {
            res.send('Student not found');
        }

    });

});

// Display Add Student page
app.get('/addStudent', (req, res) => {
    res.render('addStudent');
});

// Add Student
app.post('/addStudent', upload.single('image'), (req, res) => {

    const { name, dob, contact } = req.body;

    let image = null;

    if (req.file) {
        image = req.file.filename;
    }

    const sql = 'INSERT INTO student (name, dob, contact, image) VALUES (?, ?, ?, ?)';

    connection.query(sql, [name, dob, contact, image], (error) => {

        if (error) {
            console.error('Error adding student:', error);
            return res.send('Error adding student');
        }

        res.redirect('/');
    });

});

// Display Edit Student page
app.get('/editStudent/:id', (req, res) => {

    const studentId = req.params.id;

    const sql = 'SELECT * FROM student WHERE studentId = ?';

    connection.query(sql, [studentId], (error, results) => {

        if (error) {
            console.error(error);
            return res.send('Error retrieving student');
        }

        if (results.length > 0) {
            res.render('editStudent', { student: results[0] });
        } else {
            res.send('Student not found');
        }

    });

});

// Update Student
app.post('/editStudent/:id', upload.single('image'), (req, res) => {

    const studentId = req.params.id;
    const { name, dob, contact } = req.body;

    let image = req.body.currentImage;

    if (req.file) {
        image = req.file.filename;
    }

    const sql = `
        UPDATE student
        SET name = ?, dob = ?, contact = ?, image = ?
        WHERE studentId = ?
    `;

    connection.query(sql, [name, dob, contact, image, studentId], (error) => {

        if (error) {
            console.error(error);
            return res.send('Error updating student');
        }

        res.redirect('/');

    });

});

// Delete Student
app.get('/deleteStudent/:id', (req, res) => {

    const studentId = req.params.id;

    const sql = 'DELETE FROM student WHERE studentId = ?';

    connection.query(sql, [studentId], (error) => {

        if (error) {
            console.error(error);
            return res.send('Error deleting student');
        }

        res.redirect('/');

    });

});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});