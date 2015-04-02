
//-----------------------------------------------------------------------
// Constructor for the view of the collection of bus stop's departures.
//  - It will be binded to a collection of RouteDepartures
//-----------------------------------------------------------------------

define([
  "marionette",
  "app/views/DepartureView"
],

function(Marionette, DepartureView) {
  "use strict";

  var DeparturesView = Marionette.CollectionView.extend({
    childView: DepartureView
  });

  return DeparturesView;
});


