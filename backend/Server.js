// 1. Import Express
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

// 2. Initialize the Express application
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Abhi1121!",
    database: "todo"
})

db.connect((error) => {
    if (error) {
        console.log("Error connecting to the database")
        return
    }
    console.log("connected with database")
})

app.get('/', (req, res) => {
    console.log("Default route")
    db.query('select * from todoItems', (error, result) => {
        if (error) {
            console.log("Error creating record", error)
            return
        }
        console.log("Data", result)
        res.send(result)
    })
})
app.post('/add-item', (req, res) => {
    console.log("req", req.body)
    db.query(`insert into todoItems(itemDescription) values('${req.body.text}')`, (error, results) => {

        if (error) {
            console.log("Error creating record", error)
            return
        }
        console.log(`Created record successfuly: ${{ results }}`)
    })

    res.send(`Created successfuly`)
})

app.put('/edit-item', (req, res) => {
    console.log("req", req.body)
    db.query(`update todoItems set itemDescription='${req.body.itemDescription}' where ID=${req.body.ID}`, (error, results) => {

        if (error) {
            console.log("Error creating record", error)
            return
        }
        console.log("Updated successfuly")
    })

    res.send("Updated successfuly")
})

app.delete('/deleteTodo/:id', (req, res) => {
    const id = req.params.id;
    console.log("Deleting ID:", id);
    db.query(`delete from todoItems where ID=${id}`, (error, results) => {
        if (error) {
            console.log("Error deleting record", error);
            return res.status(500).send("Error deleting record");
        }
        console.log(`Deleted successfully ID=${id}`);

    });
    res.send("Deleted successfully");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})