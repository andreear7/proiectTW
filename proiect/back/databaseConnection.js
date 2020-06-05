var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var client = {
    connection : "null" ,
    getConnection: function () {
        return this.connection;
    },
    setConnection: function (val) {
        this.connection = val;
    }
  };

async function connectToMongo(){
    if(client.getConnection()=="null")
 {client.setConnection( MongoClient(url));
 await client.getConnection().connect(); }
return client.getConnection();
}
console.log(connectToMongo());
module.exports={connectToMongo}