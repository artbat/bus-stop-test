var request = require('./request');
var querystring = require('querystring');

module.exports.request = function (path, callback) {


  if (/^\/markers/.test(path)) {
    getMarkers(path, callback);
  } else if (/^\/arrivals/.test(path)) {
    getArrivals(path, callback);
  }
  


  // var queryStringParams = querystring.parse(path.replace(/^\/markers\?/, ''));
  // var northEast = queryStringParams.northEast.split(',');
  // var southWest = queryStringParams.southWest.split(',');
  // var url = 'http://countdown.tfl.gov.uk/markers/swLat/'+southWest[0]+'/swLng/'+southWest[1]+'/neLat/'+northEast[0]+'/neLng/'+northEast[1]+'/';
  // request.request(url, function (data) {
  //   var rawData = JSON.parse(data);
  //   callback(rawData);
  // });  
};


function getMarkers (path, callback) {
  var queryStringParams = querystring.parse(path.replace(/^\/markers\?/, ''));
  var northEast = queryStringParams.northEast.split(',');
  var southWest = queryStringParams.southWest.split(',');
  var url = 'http://countdown.tfl.gov.uk/markers/swLat/'+southWest[0]+'/swLng/'+southWest[1]+'/neLat/'+northEast[0]+'/neLng/'+northEast[1]+'/';
  request.request(url, function (data) {
    var rawData = JSON.parse(data);
    callback(rawData);
  });  
}

function getArrivals (path, callback) {
  var url = 'http://countdown.tfl.gov.uk/stopBoard/58382';
  request.request(url, function (data) {
    var rawData = JSON.parse(data);
    callback(rawData);
  });  
}