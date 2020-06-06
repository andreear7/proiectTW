var request = require("request");

var url = "http://127.0.0.1:1337/info/?judet=cv&marca=&categorie=&an=2015";
describe("API works", function() {
    describe("GET /info/judet=cv", function() {
        it("returns status code 204", function(done) {
            request.get(url, function(error, response, body) {
            expect(response.statusCode).toBe(204);
            done();
        });
   });
 });
});