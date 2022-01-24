const app = require('./views');
const mongo = require('./Mongodb-config');
const uuid = require('uuid');
const { ObjectId } = require('mongodb');
const bcrypt = require("bcrypt");
const login = require("./authentikasi");

// line ... autentikasi
app.post("/mongo/login", function(req, res){
    return login.signin(req.body, res)
})

app.get("/mongo/auth", function(req, res){
    return login.verifyToken(req, res)
})


// line 10-92 crud mongodb
app.get('/mongo/listing', (req, res) => {
    const connection = mongo.getDb();
    connection
        .collection("testAPI")
        .find({}).limit(10)
        .toArray(function(err, result){
            if (err) {
                res.status(400).send("Gagal fetching");
            } else {
                res.json(result);
            }
        });
})

app.post('/mongo/posting', (req, res) => {
    const connection = mongo.getDb()
    const data = {
        id: uuid.v4,
        nim: bcrypt.hashSync(req.body.nim, 8),
        nama: req.body.nama,
        prodi: req.body.prodi
    };
    // session
    req.session.user =  req.body.nama 
    connection
        .collection("testAPI")
        .insertOne(data, function(err, result){
            if(err){
                res.status(400).send("Terkendala server");
            }else{
                console.log(`Nama ${req.body.nama} ditambahkan`)
                res.json(result)
            }
        });
    res.json(data)
});

app.get("/mongo/listing/:id", (req, res) => {
    const connection = mongo.getDb();
    connection
        .collection("testAPI")
        .find({_id: ObjectId(req.params.id)})
        .toArray(function(err, result){
            if(err){
                res.status(400).send("Tidak ada data");
            }else{
                result.map( x => {
                    res.json(x.nama)
                });
            }
        })
})

app.post("/mongo/updating/:id", (req, res) => {
    const connection = mongo.getDb();
    const nim = {_id: ObjectId(req.params.id)};
    const data_baru = {
        $set: {
            prodi: req.body.prodi
        }
    };
    connection
        .collection("testAPI")
        .updateOne(nim, data_baru, function(err, result){
            if(err){
                res.status(400).send("Data gagal update")
            }else{
                res.status(200).send("Data berhasil update")
            }
        })
})

app.delete("/mongo/delete/:id", (req, res) => {
    const connection = mongo.getDb();
    const id = {_id: ObjectId(req.params.id)};
    connection
        .collection("testAPI")
        .deleteOne(id, function(err, result){
            if(err){
                res.status(400).send("Data gagal dihapus")
            }else{
                res.status(200).send("Data berhasil dihapus")
            }
        })
})

module.exports = app;