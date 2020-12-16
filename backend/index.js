const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db"); // create pool

const app = express();

app.use(bodyParser.json());

// db.pool.query(`CREATE TABLE LISTS (
//     ID INTEGER AUTO_INCREMENT,
//     VALUE TEXT,
//     PRIMARY KEY (ID)
// )`, (err, results, fileds) => {
//     console.log("results", results);
// })


app.get("/api/values", (req, res) => {

    const sql = `SELECT * FROM LISTS`;

    db.pool.query(sql, (err, results, fileds) => {
        if(err)
            return res.status(500).send(err)
        else
            return res.json(results)
    })

})


app.post("/api/value", (req, res, next) => {

    const sql = `INSERT INTO LISTS (VALUE) VALUES ('${req.body.value}')`;

    db.pool.query(sql, (err, results, fileds) => {
        if(err)
            return res.status(500).send(err)
        else
            return res.json({ 
                success: true, 
                value: req.body.value,
                sql: sql
            })
    })

})


app.listen(5000, () => {
    console.log("app 5000 start");
})