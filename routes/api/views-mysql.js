const mysql = require('./Mysql-config');
const app = require('./views-mongo');

app.post("/mysql/post", (req, res)=> {
    const field = req.body;
    mysql.query(
        `INSERT INTO testing_1 (nama, prodi) VALUES (?, ?)`, 
        [field.nama, field.prodi], 
        (error, results, fields) => {
            if(error) throw error
            res.status(200).send(results)
        })
})

app.get("/mysql/get", (req, res) => {
    mysql.query(
        `SELECT * FROM testing_1`,
        (error, results, fields) => {
            if(error) throw error
            res.status(200).send(results)
        }
    )
})


module.exports = app;
