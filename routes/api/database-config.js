const { MongoClient }  = require("mongodb");

const mongo_uri = "mongodb://localhost:27017/expressAPI";
const client = new MongoClient(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let connection;

module.exports = {
    connectToServer: function(callback){
      client.connect(function (err, db) {
        if (err || !db) {
          return callback(err);
        }
  
        connection = db.db("expressAPI");

        console.log("Berhasil terhubung");
  
        return callback();
      });
    },
  
    getDb: function(){
        return connection
    },
};