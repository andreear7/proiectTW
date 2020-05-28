// const db=require('./databaseConnection')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
function delay(t) {
    return new Promise(resolve => setTimeout(resolve, t));
}
async function chartsQuery(tip,judet,categorie,marca,descriere,callBack)
{
    const client = new MongoClient(url);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        
        // Make the appropriate DB calls
        
        // var ceva= await listDatabases(client);
        // return callback(ceva);
        var query="{ ";
        if(judet)
        query=query+"\"JUDET\" : \"" + judet.toUpperCase() +"\"" ;
        if(categorie&&judet)
        query=query+", " +" \"CATEGORIE_NATIONALA\" : \"" + categorie.toUpperCase()+ "\"";
        if(categorie&&!judet)
        query=query +" \"CATEGORIE_NATIONALA\" : \"" + categorie.toUpperCase()+ "\"";
        if(marca&&categorie||marca&&judet)
        query=query+", " +" \"MARCA\" : \"" + marca.toUpperCase() + "\" ";
        if(marca&&!categorie&&!judet)
        query=query+" \"MARCA\" : \"" + marca.toUpperCase() + "\" ";
        if(descriere&&(judet||marca||categorie))
        query=query+", " +" \"DESCRIERE_COMERCIALA\" : \"" + descriere.toUpperCase() + "\" ";
        if(descriere&&(!judet&&!marca&&!categorie))
        query=query+" \"DESCRIERE_COMERCIALA\" : \"" + descriere.toUpperCase() + "\" ";
        query=query+"}";
        console.log(query)
        query=JSON.parse(query);
        var q2015=0
        var q2016=0
        var q2017=0
        var q2018=0
        var q2019=0
    
   
    client.db("TW").collection('an-2015').find(query).count(function(err, result){
        if(err) throw err;
    
        q2015=result;
    }) 
    client.db("TW").collection('an-2016').find(query).count(function(err, result){
        if(err) throw err;
    
        q2016=result;
    }) 
    client.db("TW").collection('an-2017').find(query).count(function(err, result){
        if(err) throw err;

        q2017=result;
    }) 
    client.db("TW").collection('an-2018').find(query).count(function(err, result){
        if(err) throw err;
    
        q2018=result;
    }) 
    client.db("TW").collection('an-2019').find(query).count(function(err, result){
        if(err) throw err;
       q2019=result;
    //   return callBack(result)
    // while(q2018==0)
    // {
    //    delay(10)
    // }
    })
    client.db("TW").collection('an-2018').find(query).count(function(err, result){
        if(err) throw err;
        q2018=result;
      constructJSON(q2015,q2016,q2017,q2018,q2019,callBack)
    //   return callBack(result)
    // while(q2018==0)
    // {
    //    delay(10)
    // }
    })
    
 function constructJSON(q2015,q2016,q2017,q2018,q2019,callBack)
 {
    //  while(q2015>100)
//     {
//         q2015=q2015/10;
//     }
//     while(q2016>100)
//     {
//         q2016=q2016/10;
//     }
//     while(q2017>100)
//     {
//         q2017=q2017/10;
//     }
//     while(q2018>100)
//     {
//         q2018=q2018/10;
//     }
//     while(q2019>100)
//     {
//         q2019=q2019/10;
//     }
    if(q2015==0&&q2016==0&&q2017==0&&q2018==0&&q2019==0)
    {
rezultat=0;

    }
    else{
//  if(tip=="pie"||tip=="bar")
//         {
var rezultat="{ \"an2015\" : " + q2015 + ", \"an2016\" : " + q2016 + ", \"an2017\" : " + q2017 + ", \"an2018\" : " + q2018+ ", \"an2019\" : " + q2019 + "}"
 rezultat=JSON.parse(rezultat)
//         }
//         else
//         {
// var rezultat="{ \"c2015\" : " + q2015 + ", \"c2016\" : " + q2016 + ", \"c2017\" : " + q2017 + ", \"c2018\" : " + q2018+ ", \"c2019\" : " + q2019 + "}"
//       rezultat=JSON.parse(rezultat)
// var rezultat = "[{ x : 100 , y : " + q2019+ "},{ x:200 , y: "+ q2018 + "},{ x:300 , y: "+ q2017 + "},{ x:400 , y: "+ q2016 + "},{ x:500 , y: "+ q2015 + "}]";
// }
    }
        // console.log(rezultat)
    
        // return callBack(rezultat);
return callBack(rezultat)
   
 }
     
 
    } catch (e) {
        console.error(e);
    } }


module.exports={chartsQuery}