
requirejs.config({
  "baseUrl": "public/js/vendor",

  "paths": {
    "app": "../app",
    "jquery": "./jquery.min",
    "bootstrap": "./backbone.marionette",
    "underscore": "./underscore",
    "backbone": "./backbone",
    "marionette": "./backbone.marionette",
    "class": "./class",
    "handlebars": "./handlebars.min",
    "googlemaps": "./maps-api.v3"
  },

  "shim": {
    jquery: {
      exports: "jQuery"
    },
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: [
        "jquery",
        "underscore"
      ],
      exports: "Backbone"
    },
    marionette: {
      deps: [
        "backbone"
      ],
      exports: "Marionette"
    },
    handlebars: {
      exports: "Handlebars"
    },
    googlemaps: {
      exports: "Maps"
    }
  }
});

// Load the main app module to start the app
requirejs(["app/main"]);
