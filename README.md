# LBi ID Test

LBi has one of London's strongest front-end engineering teams. We value HTML, CSS, JavaScript expertise







## The test
Your task will be to build an app to show live depature boards for any bus stop in London. We expect 

To help you get started, we've built a simple API that leverages [TFL's countdown APIs | http://developers.tfl.gov.uk]. 

### GET /bus-stop/all

#### required parameters

`northEast={lat,long}` - the top-right geographical point of a bounding box

`southWest={lat,long}` - the bottom-left geographical point of a bounding box 

#### Example

`/bus-stop/all?northEast=53.34234234,0.2343434&southWest=54.345345,0.342343`

#### 200 Response

    {
      "busStops": [
        ...
        {
          "id": "76014",
          "smsCode": "76014",
          "name": "Abinger Road",
          "stopIndicator": null,
          "towards": "Acton Green",
          "direction": "w",
          "lat": 51.49678794165259,
          "lng": -0.25004038368874176,
          "routes": [{
            "id": "94",
            "name": "94"
          },{
            "id": "272",
            "name": "272"
          }]
        },
        ...
      ]
    }

#### 400 Response
  
    {

    }




### GET /bus-stop/{bus-stop-id}


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




