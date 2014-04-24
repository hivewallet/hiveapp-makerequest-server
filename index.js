"use strict"

var http = require('http');
var router = require('router');
var url = require('url');
var qs = require('querystring');
var sleep = require('sleep');

var route = router();
route.get('/test1', function(req, res) {
    res.writeHead(200);
    res.end('Successful');
});

route.get('/test2', function(req, res) {
    res.setHeader('Content-Type', 'text/json')
    res.writeHead(200);
    res.end('{"result":"Successful"}');
});

route.get('/test3', function(req, res) {
    res.writeHead(200);
    res.end('{"result":"Successful"}');
});

route.get('/test4', function(req, res) {
    var urlParts = url.parse(req.url, true);
    var query = urlParts.query;

    res.writeHead(200);

    if (query['arg0'] === 'zero' && query['arg1'] == 1)
        res.end('Successful');
    else
        res.end('Failed');
});

route.post('/test5', function(req, res) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        var query = qs.parse(body);

        res.writeHead(200);
        if (query['arg0'] === 'zero' && query['arg1'] == 1)
            res.end('Successful');
        else
            res.end('Failed');
    });
});

route.get('/test6', function(req, res) {
    sleep.sleep(12);
    res.writeHead(200);
    res.end('Successful');
});

var server = http.createServer(route);
server.listen(process.env.PORT || 9009, function() {
    console.info('server listening on http://localhost:' + server.address().port);
})
