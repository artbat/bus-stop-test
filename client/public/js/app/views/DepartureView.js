
//-------------------------------------------------------------
//Constructor for the view of a single bus stop's departure.
//-------------------------------------------------------------

define([
  "marionette",
  "handlebars",
  "app/views/Templates",
  "app/views/HandlebarsHelpers"
],

function(Marionette, Handlebars, templates) {
  "use strict";

  var DepartureView = Marionette.ItemView.extend({
    template: Handlebars.compile(templates["departure-template"]),
    tagName: "li",
    className: "route clearfix"
  });

  return DepartureView;
});


