//sursa:https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
const sqlite3 = require('sqlite3').verbose();
const infoService=require('./infoService')
const statisticsService=require('./statisticsService')
var map;
function delay(t) {
    return new Promise(resolve => setTimeout(resolve, t));
}
async function handle(request, response) {
    console.log('request ', request.url);
var purl=url.parse(request.url,true)
    var filePath = '.' + request.url;
    if(filePath.includes('/?'))
    {
    if(filePath.includes('./info/?'))
{console.log("info");
console.log(purl.query.judet,purl.query.categorie,purl.query.marca,purl.query.an)
response.writeHead(200, { 'Content-Type': 'application/json' });

    infoService.tableQuery(purl.query.judet,purl.query.categorie,purl.query.marca,purl.query.an,function(result) {
        result=JSON.stringify(result)
        response.end(result);
    })
  
}
else {
    if(filePath.includes('./statistici/?'))
    {
        console.log("stat");
        console.log(purl.query.tip,purl.query.judet,purl.query.categorie,purl.query.marca,purl.query.descriere)
        response.writeHead(200, { 'Content-Type': 'application/json' });
        
            statisticsService.chartsQuery(purl.query.tip,purl.query.judet,purl.query.categorie,purl.query.marca,purl.query.descriere,function(result) {
                
                result=JSON.stringify(result) 
                console.log("result",result);
                response.end(result);
            })

    } } }
 else {

    switch(filePath) {
    case ('./info') :  filePath = '../front/homef.html'; 
    break;
    case ('./statistici') :   filePath = '../front/statistici.html';  
    break;
    case('./harta') : filePath = '../front/harta.html'; 
   break;
   default: filePath= '../front/'+ request.url;  
}
 

var extname = String(path.extname(filePath)).toLowerCase();
console.log(extname)
var mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
    '.ico' : 'image/x-icon'
};

var contentType = mimeTypes[extname];
console.log(contentType)

fs.readFile(filePath, function(error, content) {
    if (error) {
        console.log("eroare")
        if (error.code == 'ENOENT') {
            fs.readFile('./404.html', function(error, content) {
                console.log("404")
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end(content, 'utf-8');

            });
        } else {
            console.log("500")
            response.writeHead(500);
            response.end('Error ' + error.code + ' ..\n');
        }
    } else {

        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
    } 
});
   
}
}

module.exports = { handle }
