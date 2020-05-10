//https://gist.github.com/shimondoodkin/6213581?fbclid=IwAR1ZFSCdZWCLG0oAlDyuUvjc6yoUJWkdVUDTxuVU1y2wS5YIODSWVpbXDhs
var http = require('http');
var url = require('url');
var fs = require('fs');
// module.import = { tabel } from './handler.js';
const tabelInfo=require('./handler').tabelInfo
 const tabel =require('./handler').tabel
http.createServer(function(req, res) {
  
  var purl = url.parse(req.url, true);
  if (purl.pathname == '/info/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hello ' + (purl.query.categorie||"world") ); // notice i use querystring arguments here http://127.0.0.1:1337/hello?name=me!
  } else {

// const handler= handlers.find(h=>h.method==req.method && h.url==req.url)
// const result = handler.func(purl.query.judet,purl.query.categorie,purl.query.marca,purl,query.an);
res.writeHead(200, {'Content-Type': 'text/plain'});
const result=tabelInfo(purl.query.judet,purl.query.categorie,purl.query.marca,purl.query.an)

res.end({"res" :result})
  }

  //   fs.exists(__dirname + purl.pathname, function(exists) {
  //     if (exists) {

  //       var extention = purl.pathname.match(/\..+$/)[0];
  //       var mime = {
  //         '.js': 'text/javascript; charset=UTF-8',
  //         '.txt': 'text/plain; charset=UTF-8',
  //         '.html': 'text/html; charset=UTF-8',
  //         '.png': 'image/png',
  //         '.gif': 'image/gif',
  //         '.jpg': 'image/jpeg'
  //       }

  //       res.writeHead(200, {'Content-Type': mime[extention]});
  //       fs.readFile(__dirname + purl.pathname, function(err, data) {
  //         if (err) throw err;
  //         res.end(data);
  //       });

  //     } else {
  //       res.writeHead(404, {'Content-Type': 'text/plain'});
  //       res.end('File Not Found');
  //     }
  //   });

  // }

}).listen(1337);
const handlers=[
  {
    "url" : "/tabel",
    "method" : "GET",
    "func" : tabel

  }
,
  {
    "url" : "/tabel/?",
    "method" : "GET",
    "func" : tabelInfo

  }
]
console.log('Server running at http://127.0.0.1:1337/');