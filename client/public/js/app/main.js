define([
  "marionette",
  "underscore",
  "jquery",
  "app/models/Model",
  "app/views/DeparturesView",
  "async!//maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"
],

function(Marionette, _, $, Model, DeparturesView) {
  "use strict";

  window.app = new Marionette.Application();

  //UI Setups
  var docHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  document.getElementById("map-canvas").style.height = (docHeight * .4)+"px";

  //Gmap creation. In a real web app, location wouldn't be simulated
  app.map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 16,
    center: new google.maps.LatLng(51.49498464081166, -0.09950421728487369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: false
  });

  //More UI setups
  var headerHeight = document.getElementById("header").offsetHeight;
  console.log(headerHeight);
  document.getElementById("route-departures").style.paddingTop = headerHeight+"px";

  //Event handler on Marionette App start
  app.on("start", function() {
    console.log("app started");

    //App initializations
    //----------------------------
    app.model = new Model();
    app.model.initialize();
    app.model.map = app.map;

    app.view = new DeparturesView();
    app.view.collection = app.model.departures;

    app.addRegions({
      departures: "#route-departures"
    });
    app.departures.show(app.view);

    //Additional Event handlers
    //----------------------------
    //Fetch bus stops within map bounds when it's ready the first time
    google.maps.event.addListenerOnce(app.map, 'idle', function(){
      app.model.refreshBusStops();
    });

    //Avoid creating too much markers zooming out
    google.maps.event.addListener(app.map, 'zoom_changed', _.debounce(function(){
      if(this.getZoom() < 15) this.setZoom(15);
      app.model.refreshBusStops();
    }, 250));

    //Refresh markers after user finishes map interaction
    google.maps.event.addListener(app.map, 'center_changed', _.debounce(function(){
      app.model.refreshBusStops();
    }, 250));
  });

  //Let's go!
  app.start();
});


