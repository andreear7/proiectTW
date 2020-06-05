var request = require("request");

var url = "http://127.0.0.1:1337/cevagresit";
describe("API works", function() {
    describe("GET /cevagresit", function() {
        it("returns status code 404", function(done) {
            request.get(url, function(error, response, body) {
            expect(response.statusCode).toBe(404);
            done();
        });
   });
 });
});