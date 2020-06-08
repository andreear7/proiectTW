//sursa:https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
const infoService = require('./service/InfoService')
const adminService = require('./service/adminService')
const contactService = require('./service/ContactService')
const statisticsService = require('./service/StatisticsService')

async function handle(request, response) {
    console.log('request ', request.url);
    var purl = url.parse(request.url, true)
    var filePath = '.' + request.url;
    if (filePath.includes('/?')) {

        if (filePath.includes('./administrare/?name')) {
            adminService.logIn(purl.query.name, purl.query.password, function (result) {

                if (result == 0) {
                    response.writeHead(204, "NO CONTENT", {'Content-Type': 'text/plain'});
                    response.end("gresit")
                } else {
                    response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
                    response.end("corect")

                }
            });
        }


        if (filePath.includes('./info/?')) {
            response.writeHead(200, {'Content-Type': 'application/json'});
            infoService.tableQuery(purl.query.judet, purl.query.categorie, purl.query.marca, purl.query.an, function (result) {
                result = JSON.stringify(result)
                if (result == '[]') {
                    response.writeHead(204, "NO CONTENT", {'Content-Type': 'application/json'});
                    response.end("{}")
                } else {
                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.end(result);
                }
            })

        } else {
            if (filePath.includes('./statistici/?')) {
               

                statisticsService.chartsQuery(purl.query.tip, purl.query.judet, purl.query.categorie, purl.query.marca, purl.query.descriere, function (result) {
                    if (result == 0) {
                        response.writeHead(204, "NO CONTENT", {'Content-Type': 'application/json'});
                        response.end("{}")
                    } else {
                        response.writeHead(200, {'Content-Type': 'application/json'});

                        result = JSON.stringify(result)
                        
                        response.end(result);
                    }
                })

            } else {
                if (filePath.includes('./contact/?') && request.method == 'POST') {

                    contactService.insert(purl.query.email, purl.query.nume, purl.query.comentariu, function (result) {

                        if (result == 0) {
                            response.writeHead(400, "BAD REQUEST", {'Content-Type': 'text/plain'});
                            response.end("✖️ Toate campurile sunt obligatorii!")
                        } else {
                            response.writeHead(201, "CREATED", {'Content-Type': 'text/plain'});
                            result = "✔️ Comentariu trimis cu succes!"
                           
                            response.end(result);
                            contactService.sendEmail(purl.query.email);
                        }
                    })
                } else {
                    if (filePath.includes('./administrare/?')) {
                        if (purl.query.operatie == "insert" && request.method == 'POST') {
                            adminService.insert(purl.query.judet, purl.query.categorieN, purl.query.categorieC, purl.query.marca, purl.query.descriere, purl.query.an, purl.query.total, function (result) {
                                if (result == 1) {
                                    response.writeHead(201, "CREATED", {'Content-Type': 'text/plain'});
                                    result = "✔️ Inregistrare introdusa cu succes!"
                                    response.end(result)
                                } else {
                                    response.writeHead(500, "INTERNAL SERVER ERROR", {'Content-Type': 'text/plain'});
                                    response.end("✖️ EROARE!")
                                }
                            });
                        }


                        if (purl.query.operatie == "update" && request.method == 'PUT') {
                            adminService.update(purl.query.id, purl.query.judet, purl.query.categorieN, purl.query.categorieC, purl.query.marca, purl.query.descriere, purl.query.an, purl.query.total, function (result) {
                                if (result == 1) {
                                    response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
                                    result = "✔️ Inregistrare modificata cu succes!"
                                    response.end(result)
                                } else {
                                    response.writeHead(500, "INTERNAL SERVER ERROR", {'Content-Type': 'text/plain'});
                                    response.end("✖️ EROARE!")
                                }
                            });
                        }


                        if (purl.query.operatie == "delete" && request.method == 'DELETE') {
                            adminService.deletee(purl.query.id, purl.query.an, function (result) {
                                if (result == 1) {
                                    response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
                                    result = "✔️ Inregistrare stearsa cu succes!"
                                    response.end(result)
                                } else {
                                    response.writeHead(500, "INTERNAL SERVER ERROR", {'Content-Type': 'text/plain'});
                                    response.end("✖️ EROARE!")
                                }
                            });
                        }


                    }
                }


            }
        }
    } else {


        switch (filePath) {
            case ('./info') :
                filePath = '../front/info.html';
                break;
            case ('./statistici') :
                filePath = '../front/statistici.html';
                break;
            case('./harta') :
                filePath = '../front/harta.html';
                break;
            case ('./contact') :
                filePath = '../front/contact.html';
                break;
            case ('./acasa') :
                filePath = '../front/home.html';
                break;
            case ('./log-admin') :
                filePath = '../front/log-admin.html';
                break;
            default:
                filePath = '../front/' + request.url;
        }


        var extname = String(path.extname(filePath)).toLowerCase();
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
            '.ico': 'image/x-icon'
        };

        var contentType = mimeTypes[extname];

        fs.readFile(filePath, function (error, content) {

            if (error) {
                if (error.code == 'ENOENT') {
                    fs.readFile('./404.html', function (error, content) {
                        console.log("error 404")
                        response.writeHead(404, {'Content-Type': 'text/html'});
                        response.end(content, 'utf-8');

                    });
                } else {
                    console.log("error 500")
                    response.writeHead(500);
                    response.end('Error ' + error.code + ' ..\n');
                }
            } else {

                response.writeHead(200, {'Content-Type': contentType});
                response.end(content, 'utf-8');
            }
        });

    }
}

module.exports = {handle}
