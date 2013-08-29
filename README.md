# LBi ID Test



## Preamble

LBi has one of the strongest front-end engineering teams in London. 
We value HTML, CSS, JavaScript expertise /// excited by Node.js etc.
We're looking for talented developers who are passionate about JavaScript and who take pride in their code.


## The test
Whether you're new to London, or have lived here all your life, from time to time you'll need to catch a bus. 

As you might have discovered, not all bus stops in London have live departure boards. There are apps that help, but it's more fun to build your own, right? 

So that's exactly what we'd like you to do... build an app to show live a depature board for any bus stop in London.



## Specification

In terms of functionality, the minimum we expect is:

- A means for browsing available bus stops on a map
- A means for viewing all upcoming bus arrivals for a specific stop

We expect you'll have an eye for design, so we leave the visual design to you. 



## What we're looking for

In your app we'll be looking for:

- Completeness of solution - *does the app work?*
- Quality of code - *is your code clean & well written?*
- Eye for detail - *how does your app look?*



## Getting started

Don't worry, you won't be starting completely from scratch - we've already built a simple API for you on top of [TFL's bus APIs](http://www.tfl.gov.uk/developers). Details on that below. 

You'll need to write the HTML, CSS and JavaScript yourself. 

If you're going to use an AJAX library, stick with jQuery.


## API
#### Overview

The simple API we've written for you consists of the following resources:

- [GET /bus-stop/all](#get-bus-stopall).  Retrieve a list of all bus stops within a given bounding box.
- [GET /bus-stop/{bus-stop-id}](#get-bus-stopbus-stop-id).  Retrieve a list of bus arrivals for a single stop.

Note that all requests support [JSONP](http://json-p.org/) via the `callback` parameter.

#### Specification
##### GET `/bus-stop/all`

This is used to return a list of bus stops within a bounding box (two points in a rectangle). 

##### Required parameters

- `northEast={lat,long}` - the top-right geographical point of a bounding box, where lat and long are decimal values.
- `southWest={lat,long}` - the bottom-left geographical point of a bounding box, where lat and long are decimal values. 

##### <a id="one"></a> Example

`/bus-stop/all?northEast=51.52783450,-0.04076115&southWest=51.51560467,-0.10225884`

##### 200 Response
```json
{
  "busStops": [
    ...
    {
      "id": "77994",
      "smsCode": "77994",
      "name": "Aldersgate Street / Goswell Road",
      "stopIndicator": "BX",
      "towards": "Holborn",
      "direction": "sw",
      "lat": 51.52363797159915,
      "lng": -0.09749245212910045,
      "routes": [{
        "id": "55",
        "name": "55"
      }, {
        "id": "243",
        "name": "243"
      }, {
        "id": "N35",
        "name": "N35"
      }, {
        "id": "N55",
        "name": "N55"
      }]
    }
    ...
  ]
}
```

##### 400 Response
    {

    }




### GET /bus-stop/{bus-stop-id}
Retrieve a list of bus arrivals for a single stop

#### required parameters

#### Example


`/bus-stop/58382`



#### 200 Response

    {
      "lastUpdated": "17:23",
      "filterOut": [ ],
      "arrivals": [
        {
          "routeId": "K3",
          "routeName": "K3",
          "destination": "Roehampton Vale",
          "estimatedWait": "3 min",
          "scheduledTime": "16:27",
          "isRealTime": true,
          "isCancelled": false
        },
        ...
      ]
      "isCancelled": false
      }],
      "serviceDisruptions": {
        "infoMessages": [],
        "importantMessages": [],
        "criticalMessages": []
      }
    }




