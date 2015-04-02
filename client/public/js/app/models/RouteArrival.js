
//Backbone Model Constructor representing a single route arrival
//-----------------------------------------------------------
define(["backbone"], function(Backbone) {

  var RouteArrival = Backbone.Model.extend({
    defaults:{
      "routeId":       undefined,
      "routeName":     undefined,
      "destination":   undefined,
      "scheduledTime": undefined
    }
  });

  return RouteArrival;
});


