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
async function callback(cb) {
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
 
// )}

// async function bd(){
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var myPromise = () => (
//       new Promise((resolve, reject) => {
//     var dbo = db.db("TW");
//     var query = {JUDET : "VRANCEA" };
//     var result=dbo.collection("an-2019").find(query).count(); return result;}).then(function (result) { 
//        callback(result); resolve(result); db.close(); })
  
//     )}
//   )}
// }  


 async function tabelInfo ( judet,categorie,marca,an ) 
{
  await MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("TW");
    var query = {JUDET : "VRANCEA" , };
     var result=dbo.collection("an-2019").find(query).count();
    result.then(async function (value) { await callback(value) });
      db.close();
  });
 return await this.res;
//  bd();
// try {
//   MongoClient.connect("mongodb://localhost:27017/",  function(err, client) {
   
//    const db = client.db('TW');
  
//    //Step 1: declare promise
  
//    var myPromise = () => {
//      return new Promise((resolve, reject) => {
    
//         db
//          .collection('an-2019')
//          .find({JUDET: "VRANCEA"})
//          .limit(1)
//          .toArray(function(err, data) {
//              err 
//                 ? reject(err) 
//                 : resolve(data[0]);
//            });
//      });
//    };

//    //Step 2: async promise handler
//    var callMyPromise = async () => {
      
//       var result = await (myPromise());
//       //anything here is executed after result is resolved
//       return result;
//    };

//    //Step 3: make the call
//    callMyPromise().then(function(result) {
//       client.close();
//       var c=result;
//       console.log(c)
//    });
// }); //end mongo client

// } catch (e) {
//  console.log(e)
// }

 //var ret = "Ai pus:"+"heeei"+judet+marca+categorie+an;
 
   
}
function tabel (  ) 
{

  return JSON.stringify("Ai apelat tabel");
};
// module.exports.tabel
// module.exports.tabelInfo
module.exports ={tabel,tabelInfo};