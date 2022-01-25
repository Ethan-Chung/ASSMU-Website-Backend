const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const { rootCertificates } = require('tls');

const db = mysql.createPool({ //creates a connection between the database
    host: 'localhost',
    user: 'root',
    password: 'SMUassmu@',
    database: 'assmu'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("hello world");
});

app.post("/api/insert", (req, res) => { //creates a route 

    const test1Insert = req.body.test1Insert
    const test2Insert = req.body.test2Insert

    const sqlInsert = "INSERT INTO test_table (test1, test2) VALUES (?,?)"
    db.query(sqlInsert, [test1Insert, test2Insert], (err, result) => {
        console.log(err);
    })
    
});

app.listen(3001, () => {
    console.log("running on port 3001");
});