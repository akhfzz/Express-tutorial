const app = require('./routes/api/views-mysql');
const Mongo = require('./routes/api/Mongodb-config');
const mysql = require('./routes/api/Mysql-config')

Mongo.connectToServer(function(err){
    if(err){
        console.log("Maaf tidak bisa terkoneksi");
        process.exit()
    }
})

mysql.connect(function(err){
    if(err){
        console.log("Error koneksi ke mysql")
    }
})

app.listen(8000, () =>{
    console.log('routing now')
})