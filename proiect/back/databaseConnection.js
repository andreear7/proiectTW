var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
// var client={
// get connected(){
// return this.connected; },
// set connected(ok) {
//     this.connected=ok;
// }
// }
// function Ab(n){
//     this.connected= 0;
// }
// Object.defineProperty(Ab.prototype, "connected", {
//     get: function(){ return this._connected},
//     set: function(value){ this._connected = value }
// });
var client={
"connection" : null,
"connected" :0
}
// Object.defineProperty(client, 'connected');
// client.connected=0;

async function connectToMongo(){
    
 client.connection=new MongoClient(url);
 await client.connection.connect();
 client.connected=1;
return client;


}
// console.log(connectToMongo());
module.exports={connectToMongo}