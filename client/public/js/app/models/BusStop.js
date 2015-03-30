
//------------------------------------------------------------------
// Constructor for a Backbone Model representing a single bus stop
//------------------------------------------------------------------
define(["backbone"], function(Backbone) {

  var BusStop = Backbone.Model.extend({
    idAttribute: "id",
    defaults:{
      "smsCode":       undefined,
      "name":          undefined,
      "stopIndicator": undefined,
      "towards":       undefined,
      "direction":     undefined,
      "lat":           undefined,
      "lng":           undefined,
      "routes":        [],
      "marker":        undefined   //google.maps.Marker
    }
  });

  return BusStop;
});


