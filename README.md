# LBi ID Test

LBi has one of London's strongest front-end engineering teams. We value HTML, CSS, JavaScript expertise

## The test
The test is a simple one: build an app to show live depature boards for every bus stop in London.

To help you get started, we've built two simple APIs that leverage TFL's countdown APIs. 

### GET /bus-stop/all

#### required parameters

`northEast={lat,long}` - the top-right geographical point of a bounding box

`southWest={lat,long}` - the bottom-left geographical point of a bounding box 

#### Example

`/bus-stop/all?northEast=53.34234234,0.2343434&southWest=54.345345,0.342343`

#### 200 Response

#### 400 Response





### GET /bus-stop/{bus-stop-id}

