// - Requirements -
const path = require('path')
const mysql = require('mysql2')
const ejs = require('ejs')
const express = require('express');
const { error } = require('console');
const { rmSync } = require('fs');

// - Init -
const connection = mysql.createConnection({
    host: 'localhost', // Your host name
    user: 'root', // Your database username
    password: '2810', // Your database password
    database: 'kd' // Your database name
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MariaDB: ' + err.stack);
        return;
    }
    console.log('Connected to MariaDB as id ' + connection.threadId);
});

const app = express()

app.use(express.json());
app.use('/public', express.static('public'));
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs');

// - Static routes -
app.get('/', (req, res) => {
    connection.query(`
        SELECT s.id AS student_id, s.name AS student_name, p.name AS professor_name, s.specialization, s.graduation_year 
        FROM students s 
        JOIN professors p ON s.professor_id = p.id`,
    (error, results, fields) => {
        if (error) {
            console.log('pizdec')
            return
        }
        console.log(results)

        connection.query(`
            SELECT s.id AS student_id, s.name AS student_name
            FROM students s
            WHERE s.professor_id = 0`,
        (error, rslts, fields) => {
            console.log(rslts)

            for (let i = 0; i < rslts.length; i++) {
                results.push(rslts[i])
            }

            res.render('index', {arr: results})
        })
    })
})

app.get('/addStudent', (req, res) => {
    connection.query(`
        SELECT id, name FROM professors`,
    (error, results, fields) => {
        if (error) {
            console.log(error)
            return
        }

        console.log(results)
        res.render('addStudent', {arr: results})
    })
})

// - Logic routes -
app.post('/student', async (req, res) => {
    const body = req.body
    // Create a new Date object
    const currentDate = new Date();

    // Get the current year
    const currentYear = currentDate.getFullYear();

    body.graduation_year = currentYear + 4

    console.log(body)

    connection.query(`
        INSERT INTO students (name, professor_id, specialization, graduation_year)
        VALUES ('${body.name}', ${body.profID}, '${body.theme}', ${body.graduation_year})
        `,
    (error, resutls, fields) => {
        if (error) {
            console.log(error)
            res.status(500).send(error)
        }

        res.sendStatus(200)
    })
})

app.get('/professors', async (req, res) => {
    connection.query(`
        SELECT * FROM professors`,
    (error, results, fields) => {
        if (error) {
            console.log(error)
            res.status(500).send(error)
        }

        connection.query(`
            SELECT * FROM students`,
        (err, rslts, fields) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            }

            let response = []
            for (let i = 0; i < results.length; i++) {
                let profObj = {}

                profObj.students = []
                for (let j = 0; j < rslts.length; j++) {
                    if (results[i].id === rslts[j].professor_id) {
                        console.log(rslts[j])
                        profObj.students.push(rslts[j])
                    }
                }

                profObj.name = results[i].name
                profObj.num_students = results[i].num_students
                profObj.id = results[i].id

                response.push(profObj)
            }

            console.log(response)
            res.render('unpin', {arr: response})
        })
    })
})

app.delete('/unpin', async (req, res) => {
    let id = req.body.id

    connection.query(`
        UPDATE students
        SET professor_id = 0
        WHERE id = ${id}`,
    (error, resutls, fields) => {
        if (error) {
            console.log(error)
            res.status(500).send(error)
        }

        res.sendStatus(200)
    })
})

// - Starting the server -
app.listen(3000, () => {
    console.log('server started')
})