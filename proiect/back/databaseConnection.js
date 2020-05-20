var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
function query(){
    console.log("ma apeleaza")
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TW");
  
  var query = { JUDET: "VRANCEA" , MARCA : "BMW"};
  result=dbo.collection("an-2019").find(query).count();
//   toArray(function(err, result) {
//     if (err) throw err;
    console.log("nomoj",result);
//     db.close();
//   });
db.close();
});
}
module.exports={query}