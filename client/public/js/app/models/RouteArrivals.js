
//------------------------------------------------------------------------------------
// Backbone Collection Constructor for route arrivals. Populates from the REST API
//------------------------------------------------------------------------------------

define([
  "backbone",
  "app/models/RouteArrival"
],

function(Backbone, RouteArrival) {
  "use strict";

  var RouteArrivals = Backbone.Collection.extend({
    model: RouteArrival,
    url: "/bus-stops/{id}"
  });

  return RouteArrivals;
});


