var http = require('http');
var url = require('url');
var fs = require('fs');
 const app=require('./app')
 const server=http.createServer(app.handle)
server.listen(1337);

console.log('Server running at http://127.0.0.1:1337/');