
requirejs.config({
  "baseUrl": "public/js/vendor",

  "paths": {
    "app": "../app",
    "async": "./async",
    "jquery": "./jquery.min",
    "bootstrap": "./backbone.marionette",
    "underscore": "./underscore",
    "backbone": "./backbone",
    "marionette": "./backbone.marionette",
    "class": "./class",
    "handlebars": "./handlebars.min"
  },

  "shim": {
    async: {
      exports: "async"
    },
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
    }
  }
});

// Load the main app module to start the app
requirejs(["app/main"]);
