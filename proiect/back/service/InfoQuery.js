async function infoQuery(judet, categorie, marca) {

        var query = "{ ";
        if (judet)
            query = query + "\"JUDET\" : \"" + judet.toUpperCase() + "\"";
        if (categorie && judet)
            query = query + ", " + " \"CATEGORIE_NATIONALA\" : \"" + categorie.toUpperCase() + "\"";
        if (categorie && !judet)
            query = query + " \"CATEGORIE_NATIONALA\" : \"" + categorie.toUpperCase() + "\"";
        if (marca && judet)
            query = query + ", " + " \"MARCA\" : \"" + marca.toUpperCase() + "\" ";
        if (marca && !judet)
            query = query + " \"MARCA\" : \"" + marca.toUpperCase() + "\" ";
        query = query + "}";
        console.log(query)
        query = JSON.parse(query);
        return query;}
        module.exports={infoQuery};