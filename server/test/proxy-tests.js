var proxy = require('../proxy.js');
var assert = require('assert');
var request = require('../request');
var sinon = require('sinon');


var sampleBusStopsList = {
  "markers": [
    {
      "id": "76014",
      "smsCode": "76014",
      "name": "Abinger Road",
      "stopIndicator": null,
      "towards": "Acton Green",
      "direction": "w",
      "lat": 51.49678794165259,
      "lng": -0.25004038368874176,
      "routes": [
        {
          "id": "94",
          "name": "94"
        },
        {
          "id": "272",
          "name": "272"
        }
      ]
    }
  ]
};





describe('proxy', function () {
  describe('bus stops request', function () {    
    
    it('should translate the bounding box lat long to tfl format', function (done) {
      var path = '/markers?northEast=51.50874245880333,-0.2197265625&southWest=51.481382896100975,-0.263671875';      
      var spy = sinon.spy(request, 'request');
      var expectedUrl = 'http://countdown.tfl.gov.uk/markers/swLat/51.481382896100975/swLng/-0.263671875/neLat/51.50874245880333/neLng/-0.2197265625/?_dc=1315778608026';
      proxy.request(path, function () {});
      assert(spy.calledWithMatch(expectedUrl));
      spy.reset();
      done();
    });
    
    // it('should return a list of bus stops within a bounding box', function (done) {
    //   var url = '/markers?northEast=0.000000,32434&southWest=234234,234234';
    //   var mock = sinon.stub(request, 'request', function (options, callback) {
    //     callback(JSON.stringify(sampleBusStopsList));
    //   });
    //   proxy.request(url, function (data) {   
    //     assert.deepEqual(data, sampleBusStopsList);
    //     done();
    //   });
    // });

  });
});




/*var http = require('http');
var proxy = require('../proxy.js');
var sinon = require('sinon');

// var spy = sinon.spy(http, "request");


exports.proxy = {
  'Test we can request a list of markers': function (test) {



    // http.request('');
    // p = proxy(http);
proxy.request('', function(){});
    test.expect(1);
    proxy.request('/markers?northEast=0.000000,32434&southWest=234234,234234', function (data) {
    // console.log('\n\nSPY%s\n', spy.callCount);
console.log(data)
      test.equal(data, 2);
      test.done();
    });
  }


};

*/