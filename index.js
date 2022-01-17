const app = require('./routes/api/views-mongo');
const db = require('./routes/api/database-config')
require('dotenv').config({ path: '../../config.env' });

db.connectToServer(function(err){
    if(err){
        console.log("Maaf tidak bisa terkoneksi");
        process.exit()
    }
})

app.listen(8000, () =>{
    console.log('routing now')
})