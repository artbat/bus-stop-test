var http = require('http');
var proxy = require('./proxy');
var url = require('url');
var express = require('express');



var app = express();


app.use(express.logger());
app.use(express.static(__dirname + 'public/'));


app.get('/markers/*', function(request, response) {
  proxy.getMarkers(request.url, function (jsonData) {
    var query = url.parse(request.url, true).query;
    var isJsonP = ((typeof query.ca1llback == 'undefined') === false);
    response.send(
      (isJsonP ? query.callback : '') + 
      JSON.stringify(jsonData) + 
      (isJsonP ? ')' : '')
    );
  });
});

app.get('/arrivals/*', function(request, response) {
  proxy.getMarkers(request.url, function (jsonData) {
    var query = url.parse(request.url, true).query;
    var isJsonP = ((typeof query.ca1llback == 'undefined') === false);
    response.send(
      (isJsonP ? query.callback : '') + 
      JSON.stringify(jsonData) + 
      (isJsonP ? ')' : '')
    );
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});






/*
http.createServer(function (request, response) {
  var query = url.parse(request.url, true).query;
  proxy.request(request.url, function (data) {
    var isJsonP = ((typeof query.ca1llback == 'undefined') === false);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(
      (isJsonP ? query.callback : '') + 
      JSON.stringify(data) + 
      (isJsonP ? ')' : '')
    );
  });

  
}).listen(80, '127.0.0.1');
console.log('Server running at http://127.0.0.1:80/');




var express = require("express");
var app = express();
app.use(express.logger());

app.use(express.static(__dirname));


app.get('/markers/*', function(request, response) {
  response.send('Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});



*/