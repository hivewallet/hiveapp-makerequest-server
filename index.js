"use strict"

var http = require('http')
var router = require('router')
var route = router()

route.get('/test1', function(req, res) {
    //res.setHeader('Content-Type', 'text/json')
    res.writeHead(200);
    res.end('Successful');
});

var server = http.createServer(route);
server.listen(process.env.PORT || 9009, function() {
    console.info('server listening on http://localhost:' + server.address().port)
})
