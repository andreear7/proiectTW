//https://kuldeep15.wordpress.com/2018/01/17/node-rest-api-testing-with-jasmine/
var request = require("request");

var url = "http://127.0.0.1:1337/info/?judet=iasi&marca=bmw&categorie=&an=2015";

it("API Response should be valid json", function(done) {
    request.get(url, function(error, response, body) {
        expect(() => {
            JSON.parse(body);
        }).not.toThrow();
        done();
    });
 });