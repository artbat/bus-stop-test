
//-----------------------------------------------------------------------------------------------
//Constructor for a Backbone Collection of route arrivals.
//
// - Populates from the processing of the RouteArrivals collection, grouping arrivals by route
// - Binded to the view.
//-----------------------------------------------------------------------------------------------

define([
  "backbone",
  "app/models/RouteDeparture"
],

function(Backbone, RouteDeparture) {
  "use strict";

  var RouteDepartures = Backbone.Collection.extend({
    model: RouteDeparture,
    sync: null
  });

  return RouteDepartures;
});


