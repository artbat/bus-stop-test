var request = require('./request');
var url = require('url');
var querystring = require('querystring');


module.exports.getMarkers = function (path, callback) {
  var queryStringParams = url.parse(path, true).query;
  var northEast = queryStringParams.northEast.split(',');
  var southWest = queryStringParams.southWest.split(',');
  var tflUrl = 'http://countdown.tfl.gov.uk/markers/swLat/'+southWest[0]+'/swLng/'+southWest[1]+'/neLat/'+northEast[0]+'/neLng/'+northEast[1]+'/';
  request.request(tflUrl, function (data) {
    var rawData = JSON.parse(data);
    callback(rawData);
  });  
};

module.exports.getArrivals = function (path, callback) {
  var busStopNumber = path.replace(/^\/arrivals\/([0-9])\/?/, '$1');  
  var tflUrl = 'http://countdown.tfl.gov.uk/stopBoard/' + busStopNumber;
  request.request(tflUrl, function (data) {
    var rawData = JSON.parse(data);
    callback(rawData);
  });  
};