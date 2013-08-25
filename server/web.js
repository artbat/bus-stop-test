var http = require('http');
var proxy = require('./proxy');
var url = require('url');
var express = require('express');
var app = express();
var developmentPort = 5000;


initialiseStaticServer();
initialiseRoutes();
startServer();


function initialiseStaticServer() {
  app.use(express.static(__dirname + '/../public/'));
}


function initialiseRoutes() {
  app.get('/markers*', function(request, response) {
    proxy.getMarkers(request.url, function(jsonData, path) {
      var queryStringParameters = url.parse(request.url, true).query;
      var jsonpCallbackName = queryStringParameters.callback;
      var isJsonP = typeof jsonpCallbackName !== 'undefined';
      if (isJsonP) {
        response.send(jsonpCallbackName + '(' +JSON.stringify(jsonData) + ')' );
      } else {
        response.json(jsonData);
      }
    });
  });

  app.get('/arrivals*', function(request, response) {
    proxy.getArrivals(request.url, function(jsonData, path) {
      var queryStringParameters = url.parse(request.url, true).query;
      var jsonpCallbackName = queryStringParameters.callback;
      var isJsonP = typeof jsonpCallbackName !== 'undefined';
      if (isJsonP) {
        response.send(jsonpCallbackName + '(' +JSON.stringify(jsonData) + ')' );
      } else {
        response.json(jsonData);
      }
    });
  });

  app.use('/', function (request, response) {
    response.sendfile('index.html');
  });
}


function startServer() {
  var port = process.env.PORT || developmentPort;
  app.listen(port, function() {
    console.log("Listening on " + port);
  });
}


function processResponse(jsonData, path) {
  var queryStringParameters = url.parse(path, true).query;
  var jsonpCallbackName = queryStringParameters.callback;
  var isJsonP = typeof jsonpCallbackName !== 'undefined';
  if (isJsonP) {
    response.send(jsonpCallbackName + '(' +JSON.stringify(jsonData) + ')' );
  } else {
    response.json(jsonData);
  }
}
