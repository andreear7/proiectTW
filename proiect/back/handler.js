// exports.createHandler = function (method) {
//     return new Handler(method);
//   }
  
//   Handler = function(method) {
//     this.process = function(req, res) {
//       params = null;
//       return method.apply(this, [req, res, params]);
//     }
//   }
var res;
getRes = function()
{
  return this.res
}
var MongoClient = require('mongodb',{ useUnifiedTopology: true }).MongoClient;
var url = "mongodb://localhost:27017/";
var map;
//inspiratie:w3s
function callback(cb) {
    map = cb;
    this.res= map;
  
    console.log(this.res)
}
function bd(){
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TW");
  var query = {JUDET : "VRANCEA" , };
  var result=dbo.collection("an-2019").find(query).count();
 result.then(function (value) { callback(value) });
    db.close();
});}
async function tabelInfo ( judet,categorie,marca,an ) 
{

await bd();
 
 //var ret = "Ai pus:"+"heeei"+judet+marca+categorie+an;
 
 
   return this.res
}
function tabel (  ) 
{

  return JSON.stringify("Ai apelat tabel");
};
// module.exports.tabel
// module.exports.tabelInfo
module.exports ={tabel,tabelInfo};