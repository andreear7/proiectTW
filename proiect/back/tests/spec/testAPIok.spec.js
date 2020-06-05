//https://kuldeep15.wordpress.com/2018/01/17/node-rest-api-testing-with-jasmine/
var request = require("request");

var url = "http://127.0.0.1:1337/info";
describe("API works", function() {
    describe("GET /info", function() {
        it("returns status code 200", function(done) {
            request.get(url, function(error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
        });
   });
 });
});