# Le ID Test

DigitasLBi has one of the strongest front-end engineering teams in London. 



We write HTML, CSS & JavaScript, and get excited by the ever evolving modern front-end development stack: Git, Grunt, Node.js, Require.js, Bower, MV\* architectures, TDD, Automation, Responsive *etc*. We're looking for talented developers who are passionate about HTML, CSS & JavaScript, who take pride in their code, and who want to build what's next.

This test is designed to assess your interest and experience in front-end web development. We want to see your code, your approach, and your talent!

## The test

This test is about buses. From time to time in London you'll need to catch a bus. Some lucky bus stops have live departure boards, but not all do. 

That's where you come in. As part of this assessment, we'd like you to build an app to show live a depature board for any bus stop in London.



## What you need to build

The requirements for the bus departure board app are pretty simple:

1. Make sure there's a map, which lets you find any stop in London
1. Make sure a user can see all imminent departures for a specific stop

You can use the data how you like, just make sure to address the above. 

That's it. We leave the design & user-experience to you.



## What we're looking for

In your app we'll be looking for:

- Completeness of solution - *does the app work as per the requirements?*
- Quality of code - *is your code clean & well written?*
- Eye for detail - *how does your app look?*

If you can't complete your app in time, give us a description of what you were planning / how you would approach it.



## Getting started

To get started, just go ahead and create your HTML, CSS, JavaScript files. 

For your map, we recommend checking out the [Google Maps API](https://developers.google.com/maps/documentation/javascript/) although you can use a different maps service if you wish.

If you're going to use an AJAX library, stick with [jQuery](http://jquery.com/).

The bulk of your work will be finding bus stops and bus data. We've written a simple [Bus stop API](#api) using the [TFL bus data](http://www.tfl.gov.uk/businessandpartners/syndication/default.aspx)  that will cover everything you'll need for your app. 

## When you're done

We expect most people to spend about an hour on this, although you're free to use more time if you want.

Once you're done, we'll need you to zip your code and send it to us, so make sure it can work when unzipped.

<a id="api"></a>
## Bus stop API

The bus stop API consists of the following resources:

1. [/bus-stop/all](#get-bus-stopall)
1. [/bus-stop/{bus-stop-id}](#get-bus-stopbus-stop-id)  

All requests support [JSONP](http://json-p.org/) via the 'callback' parameter (eg. `?callback=foo`).

<a id="get-bus-stopall"></a>
### GET /bus-stop/all
Return a list of bus stops within a given area (a bounding pox defined by two opposing points of a rectangle). 

#### Required parameters

- `northEast={lat,long}` - the top-right geographical point of a bounding box, where lat and long are decimal values.
- `southWest={lat,long}` - the bottom-left geographical point of a bounding box, where lat and long are decimal values. 

#### Example URL

[`/bus-stop/all?northEast=51.52783450,-0.04076115&southWest=51.51560467,-0.10225884'`](http://lbi-id-test.herokuapp.com/bus-stop/all?northEast=51.52783450,-0.04076115&southWest=51.51560467,-0.10225884)

#### 200 Response (ie. a successful request)

    {
      "markers": [
        {
          "id": "77994",
          "name": "Aldersgate Street / Goswell Road",
          "stopIndicator": "BX",
          "lat": 51.52363797159915,
          "lng": -0.09749245212910045,
          ...
          "routes": [{
            "id": "55",
            "name": "55"
          }]
        }
        ...
      ]
    }


#### 400 Response (ie. an error)
    {
      "errorMessage": "Missing parameter. Please ensure you have both 'northEast' and 'southWest' parameters defined."
    }



<a id="get-bus-stopbus-stop-id"></a>
### GET **/bus-stop/{bus-stop-id}**
Retrieve a list of bus arrivals for a single stop

#### Required parameters

There are none.

#### Example URL

[`/bus-stop/58382`](http://lbi-id-test.herokuapp.com/bus-stop/58382)



#### 200 Response

    {
      "arrivals": [
        {
          "routeId": "K3",
          "destination": "Roehampton Vale",
          "estimatedWait": "3 min",
          "scheduledTime": "16:27",
          "isCancelled": false,
          ...
        },
        ...
      ]
      ...
    }

#### 400 Response (ie. an error)
    {
      "errorMessage": "There was an error retrieving bus stop information. Please ensure you use a valid bus stop id"
    }


<div id="logo">
  <img src="img/digitas-lbi.png" alt="DigitasLBi" />
</div>


