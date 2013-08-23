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

var sampleBusStopArrivals = {
  "lastUpdated": "17:23",
  "filterOut": [ ],
  "arrivals": [
    {
      "routeId": "K3",
      "routeName": "K3",
      "destination": "Roehampton Vale",
      "estimatedWait": "3 min",
      "scheduledTime": "16:27",
      "isRealTime": true,
      "isCancelled": false
    },
    {
      "routeId": "K3",
      "routeName": "K3",
      "destination": "Roehampton Vale",
      "estimatedWait": "20 min",
      "scheduledTime": "16:44",
      "isRealTime": true,
     "isCancelled": false
    }
  ],
  "serviceDisruptions": {
    "infoMessages": [],
    "importantMessages": [],
    "criticalMessages": []
  }
};



describe('TFL proxy', function () {
  describe('/markers', function () {    
    
    it('should translate our bounding box lat lng format into tfl format', function (done) {
      var spy = sinon.spy(request, 'request');
      proxy.getMarkers('/markers?northEast=51.50874245880333,-0.2197265625&southWest=51.481382896100975,-0.263671875');
      assert(spy.calledWithMatch('http://countdown.tfl.gov.uk/markers/swLat/51.481382896100975/swLng/-0.263671875/neLat/51.50874245880333/neLng/-0.2197265625/'));
      spy.restore();
      done();
    });
    
    it('should return a list of bus stops within a bounding box', function (done) {
      var path = '/markers?northEast=51.50874245880333,-0.2197265625&southWest=51.481382896100975,-0.263671875';
      var mock = sinon.stub(request, 'request', function (path, callback) {
        callback(JSON.stringify(sampleBusStopsList));
      });
      proxy.getMarkers(path, function (data) {   
        assert.deepEqual(data, sampleBusStopsList);
        done();
        mock.restore();
      });
    });

  });

  describe('/arrivals', function () {

    it('should translate our url to TFL url', function (done) {
      var spy = sinon.spy(request, 'request');
      proxy.getArrivals('/arrivals/58382');
      assert(spy.calledWithMatch('http://countdown.tfl.gov.uk/stopBoard/58382'));
      spy.restore();
      done();
    });

    it('should return arrivals data', function (done) {
      var path = '/arrivals/58382';
      var mock = sinon.stub(request, 'request', function (path, callback) {
        callback(JSON.stringify(sampleBusStopArrivals));
      });
      proxy.getArrivals(path, function (data) {   
        assert.deepEqual(data, sampleBusStopArrivals);
        done();
        mock.restore();
      });
    });

  });
});
