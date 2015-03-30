
//-------------------------------------------------------------
//Constructor for the view of a single bus stop's departure.
//-------------------------------------------------------------

define([
  "marionette",
  "app/views/Templates",
  "app/views/HandlebarsHelpers"
],

function(Marionette, templates) {
  "use strict";

  var DepartureView = Marionette.ItemView.extend({
    template: Handlebars.compile(templates["departure-template"]),
    tagName: "li",
    className: "route clearfix"
    /*modelEvents:{
     "change": function(){
     this.render();
     }
     }*/
  });

  return DepartureView;
});


