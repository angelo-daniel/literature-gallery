const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql2.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'writings'
})

app.get('/', (req, res)=> {
    return res.json("From backend side");
});

app.get('/files', (req, res)=> {
    const sql = "SELECT * FROM files";
    db.query(sql, (err, data)=> {
        if(err) {
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.post('/insert-data', (req, res)=> {
    const { name, body } = req.body;

    const sql = "INSERT INTO files (title, descript, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)";
    db.query(sql, [name, body], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).send('Error Saving Data');
        }
        res.json('Data inserted successfully');
    });
});

app.delete('/delete-data/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM files where id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Data removed"});
    });
});

app.listen(8081, ()=> {
    console.log("listening");
});