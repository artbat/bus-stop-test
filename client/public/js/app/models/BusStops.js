
//------------------------------------------------------------------------------------
// Backbone Collection Constructor for route arrivals. Populates from the REST API
//------------------------------------------------------------------------------------

define([
  "backbone",
  "app/models/BusStop"
],

function(Backbone, BusStop) {
  "use strict";

  //Backbone Collection Constructor for bus stops. Populated from the REST API
  //-------------------------------------------------------------------------------
  var BusStops = Backbone.Collection.extend({
    model: BusStop,

    //Overriding Collection.reset() in order to properly erase map markers
    reset: function(){
      this.each(function(model){
        model.get("marker").setMap(null);
      });

      //Then call the "super" implementation
      Backbone.Collection.prototype.reset.apply(this, arguments);
    }
  });

  return RouteArrivals;
});


