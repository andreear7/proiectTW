var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

async function chartsQuery(tip, judet, categorie, marca, descriere, callBack) {
    const client = new MongoClient(url, {useUnifiedTopology: true});

    try {
        await client.connect();

        var query = "{ ";
        if (judet)
            query = query + "\"JUDET\" : \"" + judet.toUpperCase() + "\"";
        if (categorie && judet)
            query = query + ", " + " \"CATEGORIE_NATIONALA\" : \"" + categorie.toUpperCase() + "\"";
        if (categorie && !judet)
            query = query + " \"CATEGORIE_NATIONALA\" : \"" + categorie.toUpperCase() + "\"";
        if (marca && categorie || marca && judet)
            query = query + ", " + " \"MARCA\" : \"" + marca.toUpperCase() + "\" ";
        if (marca && !categorie && !judet)
            query = query + " \"MARCA\" : \"" + marca.toUpperCase() + "\" ";
        if (descriere && (judet || marca || categorie))
            query = query + ", " + " \"DESCRIERE_COMERCIALA\" : \"" + descriere.toUpperCase() + "\" ";
        if (descriere && (!judet && !marca && !categorie))
            query = query + " \"DESCRIERE_COMERCIALA\" : \"" + descriere.toUpperCase() + "\" ";
        query = query + "}";
        console.log(query)
        query = JSON.parse(query);
        var q2015 = 0;
        var q2016 = 0;
        var q2017 = 0;
        var q2018 = 0;
        var q2019 = 0;

        client.db("TW").collection('an-2015').find(query).count(function (err, result) {
            if (err) throw err;
            q2015 = result;
        })
        client.db("TW").collection('an-2016').find(query).count(function (err, result) {
            if (err) throw err;
            q2016 = result;
        })
        client.db("TW").collection('an-2017').find(query).count(function (err, result) {
            if (err) throw err;
            q2017 = result;
        })
        client.db("TW").collection('an-2018').find(query).count(function (err, result) {
            if (err) throw err;
            q2018 = result;
        })
        client.db("TW").collection('an-2019').find(query).count(function (err, result) {
            if (err) throw err;
            q2019 = result;
            // client.db("TW").collection('an-2018').find(query).count(function(err, result){
            //     if(err) throw err;
            //     q2018=result;
            constructJSON(q2015, q2016, q2017, q2018, q2019, callBack)
            // })
        })

        function constructJSON(q2015, q2016, q2017, q2018, q2019, callBack) {
            if (q2015 == 0 && q2016 == 0 && q2017 == 0 && q2018 == 0 && q2019 == 0) {
                rezultat = 0;
            } else {
                var rezultat = "{ \"an2015\" : " + q2015 + ", \"an2016\" : " + q2016 + ", \"an2017\" : " + q2017 + ", \"an2018\" : " + q2018 + ", \"an2019\" : " + q2019 + "}"
                rezultat = JSON.parse(rezultat)
            }
            return callBack(rezultat)
        }
    } catch (e) {
        console.error(e);
    }
}

module.exports = {chartsQuery}