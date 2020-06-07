var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
// const databaseConnection = require('../databaseConnection')

async function insert(judet, categorieN,categorieC, marca, descriere,an,  callBack) {
    const client = new MongoClient(url, {useUnifiedTopology: true});
    try {
        await client.connect();
        var colectie = "colectie";
        switch (an) {
            case "2015":
                colectie = 'an-2015';
                break;
            case "2016" :
                colectie = 'an-2016';
                break;
            case "2017" :
                colectie = 'an-2017';
                break;
            case "2018" :
                colectie = 'an-2018';
                break;
            case "2019" :
                colectie = 'an-2019';
                break;
        }
        var query = "{ ";
        if (judet)
            query = query + "\"JUDET\" : \"" + judet.toUpperCase() + "\"";
        if (categorieN && judet)
            query = query + ", " + " \"CATEGORIE_NATIONALA\" : \"" + categorieN.toUpperCase() + "\"";
        if (categorieN && !judet)
            query = query + " \"CATEGORIE_NATIONALA\" : \"" + categorieN.toUpperCase() + "\"";
              if (categorieC &&  (categorieN || judet))
            query = query + ", " + " \"CATEGORIE_COMUNITARA\" : \"" + categorieC.toUpperCase() + "\"";
        if (categorieC && !categorieN &&! judet)
            query = query + " \"CATEGORIE_COMUNITARA\" : \"" + categorieC.toUpperCase() + "\"";
        if (marca && categorieC || marca && judet)
            query = query + ", " + " \"MARCA\" : \"" + marca.toUpperCase() + "\" ";
        if (marca && !categorieC && !judet)
            query = query + " \"MARCA\" : \"" + marca.toUpperCase() + "\" ";
        if (descriere && (judet || marca || categorie))
            query = query + ", " + " \"DESCRIERE_COMERCIALA\" : \"" + descriere.toUpperCase() + "\" ";
        if (descriere && (!judet && !marca && !categorie))
            query = query + " \"DESCRIERE_COMERCIALA\" : \"" + descriere.toUpperCase() + "\" ";
        query = query + "}";
        inregistrare = JSON.parse(query);
        
        client.db("TW").collection(colectie).insertOne(inregistrare, function(err, res) {  
            if (err) throw err;  
            client.close();  
            return callBack(1);
            });  
    } catch (e) {
        
        console.error(e);
        return callBack(0);
    }
}


async function update(judet, categorieN,categorieC, marca, descriere,an,  callBack) {
    const client = new MongoClient(url, {useUnifiedTopology: true});
    try {
        await client.connect();
        var colectie = "colectie";
        switch (an) {
            case "2015":
                colectie = 'an-2015';
                break;
            case "2016" :
                colectie = 'an-2016';
                break;
            case "2017" :
                colectie = 'an-2017';
                break;
            case "2018" :
                colectie = 'an-2018';
                break;
            case "2019" :
                colectie = 'an-2019';
                break;
        }
        var query = "{ ";
        if (judet)
            query = query + "\"JUDET\" : \"" + judet.toUpperCase() + "\"";
        if (categorieN && judet)
            query = query + ", " + " \"CATEGORIE_NATIONALA\" : \"" + categorieN.toUpperCase() + "\"";
        if (categorieN && !judet)
            query = query + " \"CATEGORIE_NATIONALA\" : \"" + categorieN.toUpperCase() + "\"";
              if (categorieC &&  (categorieN || judet))
            query = query + ", " + " \"CATEGORIE_COMUNITARA\" : \"" + categorieC.toUpperCase() + "\"";
        if (categorieC && !categorieN &&! judet)
            query = query + " \"CATEGORIE_COMUNITARA\" : \"" + categorieC.toUpperCase() + "\"";
        if (marca && categorieC || marca && judet)
            query = query + ", " + " \"MARCA\" : \"" + marca.toUpperCase() + "\" ";
        if (marca && !categorieC && !judet)
            query = query + " \"MARCA\" : \"" + marca.toUpperCase() + "\" ";
        if (descriere && (judet || marca || categorie))
            query = query + ", " + " \"DESCRIERE_COMERCIALA\" : \"" + descriere.toUpperCase() + "\" ";
        if (descriere && (!judet && !marca && !categorie))
            query = query + " \"DESCRIERE_COMERCIALA\" : \"" + descriere.toUpperCase() + "\" ";
        query = query + "}";
        inregistrare = JSON.parse(query);
        
        client.db("TW").collection(colectie).updateOne(inregistrare, function(err, res) {  
            if (err) throw err;  
            client.close();  
            return callBack(1);
            });  
    } catch (e) {
        
        console.error(e);
        return callBack(0);
    }
}

async function deletee(id, an, callBack) {
    const client = new MongoClient(url, {useUnifiedTopology: true});
    try {
        await client.connect();
console.log("sunt in delete")
        var colectie = "colectie";
        switch (an) {
            case "2015":
                colectie = 'an-2015';
                break;
            case "2016" :
                colectie = 'an-2016';
                break;
            case "2017" :
                colectie = 'an-2017';
                break;
            case "2018" :
                colectie = 'an-2018';
                break;
            case "2019" :
                colectie = 'an-2019';
                break;
        }
        // var query= "{\"_id\": \"ObjectId(\"" + id + "\")}\"";
        var query= "{\"_id\":{ \"ObjectId\":\" "+id +"\"} }";
        // var query = "{\"_id\":\""+id +"\"} ";
        query = JSON.parse(JSON.stringify(query))
        
        console.log("queryu,atoo" ,query);
        // query=JSON.stringify(query);
        query=JSON.parse(query);
        console.log(typeof(query))
        console.log("queryu,atoo" ,query);
        // var query = { _id : ObjectId ( 

        // )}
        
        
        client.db("TW").collection(colectie.toString()).deleteOne(query, function(err, res) {  
            if (err) throw err;  
            client.close();  
            return callBack(1);
            });  
    } catch (e) {
        
        console.error(e);
        return callBack(0);
    }
}

module.exports = {insert,update,deletee}