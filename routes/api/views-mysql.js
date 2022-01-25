const mysql = require('./Mysql-config');
const app = require('./views-mongo');

app.post("/mysql/post", (req, res)=> {
    const field = req.body;
    mysql.query(
        `INSERT INTO testing_1 (nama, prodi) VALUES (?, ?)`, 
        [field.nama, field.prodi], 
        (error, results, fields) => {
            if(error) throw error
            res.status(200).send({
                message: results
            })
        })
})

app.get("/mysql/get", (req, res) => {
    mysql.query(
        `SELECT * FROM testing_1`,
        (error, results, fields) => {
            if(error) throw error
            res.status(200).send({
                message: results
            })
        }
    )
})

app.get("/mysql/get/:id", (req, res) => {
    mysql.query(
        `SELECT * FROM testing_1 WHERE id=?`,
        req.params.id,
        (error, results, fields) => {
            if(error) throw error
            res.status(200).send({
                message: results
            })
        }
    )
})

app.delete("/mysql/delete/:id", (req, res) => {
    mysql.query(
        `DELETE FROM testing_1 WHERE id=?`,
        req.params.id,
        (error, results, fields) => {
            if(error) throw error 
            res.status(200).send({
                message: 'Sudah dihapus'
            })
        }
    )
})

app.put("/mysql/update/:id", (req, res) => {
    mysql.query(
        `UPDATE testing_1 SET nama=?, prodi=? WHERE id=?`,
        [req.body.nama, req.body.prodi, req.params.id],
        (error, results, fields) => {
            if(error) throw error
            res.status(200).send({
                message: results
            })
        }
    )
})

module.exports = app;
