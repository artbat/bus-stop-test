
//------------------------------------------------------------------------------------
//Backbone Model Constructor representing a single departure data.
//  Inherits from RouteArrival, adding a sub-collection for the next arrivals of the same route
//----------------------------------------------------------------------------------------------
define([
  "backbone",
  "app/models/RouteArrival"
],

function(Backbone, RouteArrival) {
  "use strict";

  var RouteDeparture = RouteArrival.extend({
    idAttribute: "routeId",
    defaults:{
      "nextDepartures": []
    }
  });

  return RouteDeparture;
});





