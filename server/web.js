var http = require('http');
var proxy = require('./proxy');
var url = require('url');



http.createServer(function (request, response) {
  var query = url.parse(request.url, true).query;
  proxy.request(request.url, function (data) {
    var isJsonP = ((typeof query.callback == 'undefined') === false);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(
      (isJsonP ? query.callback : '') + 
      JSON.stringify(data) + 
      (isJsonP ? ')' : '')
    );
  });

  
}).listen(80, '127.0.0.1');
console.log('Server running at http://127.0.0.1:80/');



/*
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