
//-----------------------------------
// Handlebars Helpers for templates
//-----------------------------------

define(["handlebars"], function(Handlebars) {
  "use strict";

  //Returns next route departures collection in a properly formatted string
  Handlebars.registerHelper('showNextDepartures',
    function(departuresCollection) {
      var str = "";
      if(departuresCollection.length > 0){
        str += "then ";
        str += departuresCollection.map(function(model){
          return model.get("estimatedWait").split(" ")[0]
        }).join(", ");
        str += " min";
      }
      return str;
    }
  );

  return true;
});


