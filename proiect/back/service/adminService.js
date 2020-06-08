var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectId = require('mongodb').ObjectId;

async function logIn(name, password, callBack) {
    const client = new MongoClient(url, {useUnifiedTopology: true});
    try {
        await client.connect();
        query = "{ \"name\":\"" + name + "\" ,\"password\" : \"" + password + "\" } ";
        query = JSON.parse(query);
        client.db("TW").collection("admini").countDocuments(query, function (err, res) {
            if (err) throw err;
            client.close();
            if (res == 1) {
                return callBack(1);
            } else {
                return callBack(0);
            }
        });
    } catch (e) {

        console.error(e);
        return callBack(0);
    }


}

async function insert(judet, categorieN, categorieC, marca, descriere, an, total, callBack) {
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
        if (categorieC && (categorieN || judet))
            query = query + ", " + " \"CATEGORIE_COMUNITARA\" : \"" + categorieC.toUpperCase() + "\"";
        if (categorieC && !categorieN && !judet)
            query = query + " \"CATEGORIE_COMUNITARA\" : \"" + categorieC.toUpperCase() + "\"";
        if (marca && categorieC || marca && judet)
            query = query + ", " + " \"MARCA\" : \"" + marca.toUpperCase() + "\" ";
        if (marca && !categorieC && !judet)
            query = query + " \"MARCA\" : \"" + marca.toUpperCase() + "\" ";
        if (descriere && (judet || marca || categorieC))
            query = query + ", " + " \"DESCRIERE_COMERCIALA\" : \"" + descriere.toUpperCase() + "\" ";
        if (descriere && (!judet && !marca && !categorieC))
            query = query + " \"DESCRIERE_COMERCIALA\" : \"" + descriere.toUpperCase() + "\" ";
        if (total && (judet || marca || categorieC || descriere || categorieN))
            query = query + ", " + " \"TOTAL_VEHICULE\" : " + total;
        if (total && (!judet && !marca && !categorieC && !descriere && !categorieN))
            query = query + " \"TOTAL_VEHICULE\" : " + total;
        query = query + "}";
        inregistrare = JSON.parse(query);

        client.db("TW").collection(colectie).insertOne(inregistrare, function (err, res) {
            if (err) throw err;
            client.close();
            return callBack(1);
        });
    } catch (e) {

        console.error(e);
        return callBack(0);
    }
}


async function update(id, judet, categorieN, categorieC, marca, descriere, an, total, callBack) {
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
        if (categorieC && (categorieN || judet))
            query = query + ", " + " \"CATEGORIE_COMUNITARA\" : \"" + categorieC.toUpperCase() + "\"";
        if (categorieC && !categorieN && !judet)
            query = query + " \"CATEGORIE_COMUNITARA\" : \"" + categorieC.toUpperCase() + "\"";
        if (marca && categorieC || marca && judet)
            query = query + ", " + " \"MARCA\" : \"" + marca.toUpperCase() + "\" ";
        if (marca && !categorieC && !judet)
            query = query + " \"MARCA\" : \"" + marca.toUpperCase() + "\" ";
        if (descriere && (judet || marca || categorie))
            query = query + ", " + " \"DESCRIERE_COMERCIALA\" : \"" + descriere.toUpperCase() + "\" ";
        if (descriere && (!judet && !marca && !categorie))
            query = query + " \"DESCRIERE_COMERCIALA\" : \"" + descriere.toUpperCase() + "\" ";
        if (total && (judet || marca || categorieC || descriere || categorieN))
            query = query + ", " + " \"TOTAL_VEHICULE\" : " + total;
        if (total && (!judet && !marca && !categorieC && !descriere && !categorieN))
            query = query + " \"TOTAL_VEHICULE\" : " + total;
        query = query + "}";
        inregistrare = JSON.parse(query);

        client.db("TW").collection(colectie).updateOne({_id: new ObjectId(id)}, {$set: inregistrare}, function (err, res) {
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

        client.db("TW").collection(colectie.toString()).deleteOne({_id: new ObjectId(id)}, function (err, res) {
            if (err) throw err;
            client.close();
            return callBack(1);
        });
    } catch (e) {

        console.error(e);
        return callBack(0);
    }
}

module.exports = {insert, update, deletee, logIn}