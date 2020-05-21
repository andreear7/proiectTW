// const db=require('./databaseConnection')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

async function tableQuery(judet,categorie,marca,an,callBack)
{
    const client = new MongoClient(url);
 
    try {
       
        await client.connect();
 
        var query="{ ";
        if(judet)
        query=query+"\"JUDET\" : \"" + judet.toUpperCase() +"\"" ;
        if(categorie&&judet)
        query=query+", " +" \"CATEGORIE_NATIONALA\" : \"" + categorie.toUpperCase()+ "\"";
        if(categorie&&!judet)
        query=query +" \"CATEGORIE_NATIONALA\" : \"" + categorie.toUpperCase()+ "\"";
        if(marca&&judet)
        query=query+", " +" \"MARCA\" : \"" + marca.toUpperCase() + "\" ";
        if(marca&&!judet)
        query=query+" \"MARCA\" : \"" + marca.toUpperCase() + "\" ";
        query=query+"}";
        console.log(query)
        query=JSON.parse(query);
        var colectie=null;
        switch(an) {
        case "2015":  colectie='an-2015'; break;
        case "2016" :  colectie='an-2016'; break;
        case "2017" :  colectie='an-2017';break;
        case "2018" : colectie='an-2018';break;
        case "2019" :  colectie='an-2019';break;
    }
    client.db("TW").collection(colectie.toString()).find(query).project({ "_id": 0 }).toArray(function(err, result){
        if(err) throw err;
        client.close();
        // console.log(result)
        return callBack(result);
    }) 
console.log(an)
console.log(colectie)
    } catch (e) {
        console.error(e);
    } }

module.exports={tableQuery}