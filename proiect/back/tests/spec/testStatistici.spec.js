const statisticsService=require('../../service/statisticsService')

it('should give expected result', function(){
  var result;
    var expectedResult="{\"an2015\":251,\"an2016\":280,\"an2017\":310,\"an2018\":365,\"an2019\":403}"
    
    statisticsService.chartsQuery("line","iasi",null,"bmw",null,function(result) {
      result=JSON.stringify(result)
      expect(expectedResult).toEqual(result)
    })
    
  })
