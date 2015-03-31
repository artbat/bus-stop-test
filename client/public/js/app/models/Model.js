
//------------------------------------------------------------------------------------
// App's main model (in MVC terms, not Backbone)
//------------------------------------------------------------------------------------

define([
  "class",
  "app/models/BusStops",
  "app/models/RouteArrivals",
  "app/models/RouteDepartures"
],

function(Class, BusStops, RouteArrivals, RouteDepartures) {
  "use strict";

  var Model = Class.extend({

    //Private properties (see getters/setters)
    _currBusStopID:      null,              //Current bus stop ID
    _currBusStop:        null,              //Current bus stop model
    _lastUpdated:        undefined,         //Last update's timestamp

    lastUpdatedAsString: "--:--",           //last update string as "hh:mm"
    map:                 null,              //App's google map

    busStops:    new BusStops(),            //Collection of bus stops (straight from REST API response)
    arrivals:    new RouteArrivals(),       //Collection of raw bus stop arrivals (straight from REST API response)
    departures:  new RouteDepartures(),     //Collection for processed arrivals data (based on RouteArrivals)

    //-------------------------

    initialize: function() {
      //Custom parsing before injecting API responses into collections
      this.arrivals.parse = this.onParseArrivals.bind(this);
      this.busStops.parse = this.onParseMarkers.bind(this);

      //Bus stop collection event handlers
      this.busStops.on("add", this.addMarker.bind(this));
      this.busStops.on("remove", this.removeMarker.bind(this));
    },

    reset: function(){
      this.arrivals.reset();
      this.departures.reset();
    },


    //Smart update of bus stops within current map bounds ("smart" because it only adds and/or deletes what changes)
    //---------------------------------------------------------------------------------------------------------------
    refreshBusStops: function(onSuccess, onError){
      if(typeof onSuccess !== "function") onSuccess = function(){};
      if(typeof onError !== "function") onError = function(){};

      var self = this;
      var bounds = self.map.getBounds();

      self.busStops.url = '/bus-stops?' +
      'northEast='+bounds.getNorthEast().lat()+','+bounds.getNorthEast().lng() + '&' +
      'southWest='+bounds.getSouthWest().lat()+','+bounds.getSouthWest().lng();
      console.log("fetching bus stops from " + self.busStops.url);

      //API Request for updates.
      self.busStops.fetch({
        dataType: "jsonp",

        success: function(arrivals, response, options) {
          console.log("model.refreshBusStops() SUCCESS!");
          onSuccess();
        },

        error: function(err){
          console.log("model.refreshDepartures() ERROR -->"); console.log(err);
          onError(err);
        }
      });
    },

    //Adds a marker when a new bus stop is added to the bus stops collection
    //------------------------------------------------------------------------
    addMarker: function(busStopModel, busStopscollection, options){
      var self = this;

      //Marker creation
      busStopModel.set("marker", new google.maps.Marker({
        position: new google.maps.LatLng(busStopModel.get("lat"), busStopModel.get("lng")),
        map: this.map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          strokeColor: '#fff', strokeWeight: 2, fillColor: '#f00', fillOpacity:1
        },
        busStopId: busStopModel.get("id")
      }));
      console.log("Adding marker");

      //Marker click event handler
      google.maps.event.addListener(busStopModel.get("marker"), 'click', function(){
        console.log("click on marker " + busStopModel.id);

        //Model setup for this bus stop
        self.currBusStopID = busStopModel.id;
        var currMarker = self.currBusStop.get("marker");

        //Setting up bus stop data in header (not very MVC manipulating the view from here... time constraints, sorry! O8-)
        $("#stop-indicator").html(self.currBusStop.get("stopIndicator"));
        $("#stop-name").html(self.currBusStop.get("name"));
        $("#stop-towards").html("towards " + self.currBusStop.get("towards"));

        //Setting up last update data
        $("#last-refresh").html("&nbsp;Last Refresh " + self.lastUpdatedAsString);

        //Setting up for other bus stop data
        app.map.panTo(busStopModel.get("marker").getPosition());
      });
    },

    //Removes the map marker when the bus stop model is about to be removed from its collection
    //-------------------------------------------------------------------------------------------
    removeMarker: function(busStopModel, collection, options){
      busStopModel.get("marker").setMap(null);
      console.log("Removing marker");
    },

    //Smart update of the arrivals collection and process it in order to populate the departures collection
    //------------------------------------------------------------------------------------------------------
    refreshDepartures: function(onSuccess, onError){
      if(typeof onSuccess !== "function") onSuccess = function(){};
      if(typeof onError !== "function") onError = function(){};

      var self = this;
      if(self.currBusStopID){

        //Setting up REST API URL to current model's bus stop
        self.arrivals.url = "/bus-stops/" + self.currBusStopID;

        //Request to the REST API for smart updates to the collection.
        self.arrivals.fetch({
          dataType: "jsonp",

          success: function(arrivals, response, options) {

            //Sets up app's current time, based on server response instead of local time. This makes the app
            // time-zone independent, avoiding Madrid/London differences
            self._lastUpdated = self.parseTime(response["lastUpdated"]);
            self.lastUpdatedAsString = response["lastUpdated"];

            //Groups arrivals by route. There exist 1-N arrivals for each route
            var groups = arrivals.groupBy("routeId");

            //For each group it picks the first arrival (they're time sorted) and nests the rest in the "nextDepartures" property
            var departures =
              _.chain(groups)
                .keys()
                .map(function(routeId) {
                  var routeData = arrivals.findWhere({"routeId": routeId});
                  return {
                    "routeId":        routeData.get("routeId"),
                    "routeName":      routeData.get("routeName"),
                    "destination":    routeData.get("destination"),
                    "estimatedWait":  routeData.get("estimatedWait"),
                    "scheduledTime":  groups[routeId][0].get(["scheduledTime"]),

                    "nextDepartures": new RouteArrivals(_.rest(groups[routeId]))
                  }
                })
                .sortBy("scheduledTime")
                .value();

            //Smart updates previous departures with the new ones
            self.departures.set(departures);

            console.log("model.refreshDepartures() SUCCESS!");
            onSuccess();
          },

          error: function(err){
            console.log("model.refreshDepartures() ERROR -->"); console.log(err);
            onError(err);
          }
        })
      } else {
        onError("BUS_STOP_UNDEFINED");
      }
    },

    /**
     * Custom processing of REST API response before injecting it in the Backbone collection:
     * - UUID creation for arrivals
     * - Parsing time strings to timestamps
     */
    onParseArrivals: function(response) {
      var self = this;
      _(response["arrivals"]).each(function(arrival) {

        //UUID creation for every models in the collection. Needed for smart updates later on
        arrival.id = arrival["routeId"] + "_" + arrival["scheduledTime"]; //.split(":").join("_");

        //Parsing arrival time from string to integer timestamp
        arrival.scheduledTime = self.parseTime(arrival["scheduledTime"]);
      });

      //Returning parsed data to the collection
      return response["arrivals"];
    },

    /**
     * Custom processing of API response before injection
     * We're interested in response.markers, not response
     */
    onParseMarkers: function(response) {
      return response["markers"];
    },

    /**
     * Parses a scheduledTime string from the API, like "[ddd ]hh:mm", into an absolute integer timestamp
     *
     * @param timeString
     * @returns {number}
     */
    parseTime: function(timeString){
      var now = new Date();
      var hoursAndMinutes = timeString.split(":");
      var hours = hoursAndMinutes[0];
      var minutes = hoursAndMinutes[1];
      var delta = 0;

      //Checks if this time string is on the next day. If that is the case it'll follow the pattern "ddd hh:mm"
      if(hours.indexOf(" ") > -1){
        hours = hours.split(" ")[1];
        delta = 24 * 60 * 60 * 1000;  //Milliseconds in a day
      }
      return Date.UTC(now.getFullYear(), now.getUTCMonth(), now.getUTCDay(), hours, minutes) + delta;
    }

  });

  //-----------------------------------------
  // Getters & Setters
  //-----------------------------------------

  //Setting model's current bus stop id triggers several model updates
  Object.defineProperty(Model.prototype, "currBusStopID", {
    get: function () {
      return this._currBusStopID;
    },
    set: function(str){
      if (str !== this._currBusStopID) {
        this._currBusStopID = str;
        this._currBusStop = this.busStops.get(this._currBusStopID);

        this.arrivals.reset();
        this.departures.reset();

        this.refreshDepartures();
      }
    },
    enumerable: true,
    configurable: true
  });

  //Read only
  Object.defineProperty(Model.prototype, "currBusStop", {
    get: function () {
      return this._currBusStop;
    },
    enumerable: true,
    configurable: true
  });

  //Read only
  Object.defineProperty(Model.prototype, "lastUpdated", {
    get: function () {
      return this._lastUpdated;
    },
    enumerable: true,
    configurable: true
  });

  //Returning constructor
  return Model;
});


