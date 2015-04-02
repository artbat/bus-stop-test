
//-------------------------------------------------------------
//Constructor for the view of a single bus stop's departure.
//-------------------------------------------------------------

define([], function() {
  "use strict";

  var templates = {
    "departure-template":
      "<div>" +
      "  <span class=\"name\">{{routeName}}<\/span>" +
      "  <span class=\"destination\">{{destination}}<\/span>" +
      "<\/div>" +
      "<div>" +
      "  <span class=\"arrival\">{{estimatedWait}}<\/span>" +
      "  <span class=\"next-departures\">{{showNextDepartures nextDepartures}}<\/span>" +
      "<\/div>"
  };

  return templates;
});


