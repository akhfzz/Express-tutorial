const app = require('./views');
const mongo = require('./database-config');
const uuid = require('uuid');
const { ObjectId } = require('mongodb');

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
        nim: req.body.nim,
        nama: req.body.nama,
        prodi: req.body.prodi
    };
    connection
        .collection("testAPI")
        .insertOne(data, function(err, result){
            if(err){
                res.status(400).send("Terkendala server");
            }else{
                console.log(`Nama ${req.body.nama} ditambahkan`)
                res.status(200).send(result)
            }
        });
    res.json(data)
});

app.get("/mongo/listing/:id", (req, res) => {
    const connection = mongo.getDb();
    connection
        .collection("testAPI")
        .find({_id: ObjectId(req.params.id)}).limit(10)
        .toArray(function(err, result){
            if(err){
                res.status(400).send("Tidak ada data");
            }else{
                res.json(result);
            }
        })
})

app.post("/mongo/updating/:id", (req, res) => {
    const connection = mongo.getDb();
    const nim = {_id: ObjectId(req.params.id)}
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

module.exports = app