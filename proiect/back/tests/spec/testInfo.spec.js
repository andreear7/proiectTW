const expectedResult= [{"JUDET":"VASLUI",
"CATEGORIE_NATIONALA":"TRACTOR",
"CATEGORIE_COMUNITARA":"T1",
"MARCA":"FIAT",
"DESCRIERE_COMERCIALA":"",
"TOTAL_VEHICULE":1}];
// const infoService=require('../../infoService')

// it('should give expected result', function(){
//   var result="res"
//   infoService.tableQuery("vaslui","tractor","fiat",2015,function(result) {
//       expect(expectedResult).toEqual(result)
//     })
    
//   })
  var request = require("request");

var url = "http://127.0.0.1:1337/info/?judet=vaslui&marca=fiat&categorie=tractor&an=2015";
describe("API for info works", function() {
    describe("GET /info/?", function() {
        it("returns tractor", function(done) {
            request.get(url, function(error, response, body) {
            expect(response.body).toEqual(JSON.stringify(expectedResult))
            done();
        });
   });
 });
});
