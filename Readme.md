## stadtnavi widget

Demo: https://tiles.stadtnavi.eu/widget/

### Usage

![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/stadtnavi/stadtnavi-widget?label=latest%20version)

- Add latest CSS file to HTML page: `https://tiles.stadtnavi.eu/widget/${version}/stadtnavi-widget.css`
- Add latest JS: `https://tiles.stadtnavi.eu/widget/${version}/stadtnavi-widget.js`

There are two widgets available:

#### `StadtnaviAddressBox`

Displays a map preview of an arbitrary address in Baden-Württemberg and a link
to the pre-filled stadtnavi application so that a route search can be started easily.

To use it create a `<div>`, give it an ID and at least `200px` height and execute the following JS:
```js
new StadtnaviAddressBox(divId, title, address, options);
```

#### Arguments

- `divId`: ID of the `<div>` element into which the interactive map is placed.
- `title`: Name of the place for which the address box is for. This can be choosen freely and is used only for display purposes.
- `address`: A full address with street name, house number, postal code and city. This is used for geolocating the place on the map so precise information is required.

#### Options

The widget works without any configuration but if you want override some values, you 
can pass `options` as a JSON object with the following possible keys:

- `tileUrl`: Leaflet-compatible URL for the background map. Ignored if `wms` (see below) is configured instead.
  Default: `https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png`  
  *Note*: If you want to use the stadtnavi tiles, your domain needs to be whitelisted. Please get in touch with
  mitmachen@herrenberg.stadtnavi.de to have this done.
- `tileSize`: What size the tiles have in pixels.  
  Default: `256`
- `attribution`: The information text at the bottom right corner of the map.  
  Default: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors`
- `pinPrimaryColor`: Fill color of the map marker.  
  Default: `#f8dd14`
- `pinSecondaryColor`: Border color of the map marker  
  Default: `#000000`
- `maxZoom`: Maximum zoom level allowed.  
  Default: 18
- `stadtnaviLinkText`: Link text shown for routing link
  Default: `Route auf stadtnavi suchen`
- `stadtnaviBaseUrl`: Base URL of stadtnavi instance used for routing link
  Default: `https://herrenberg.stadtnavi.de/`
- `logoUrl`: URL of the logo to display at the top right hand corner
  Default: `null`
- `wms.url`: The URL of a WMS service to fetch map tiles from.
  Default: `null`
- `wms.layers`: Comma-separated list of layers for the map tiles
  Default: `null`
- `wms.format`: Image format to use
  Default: `image/png`

#### `StadtnaviLocationSelector`

Displays a map where users can select a location either by text search, clicking 
into the map or by using the location API of their browser.

To use it create a `<div>`, give it an ID and at least 100px height and execute the following JS:
```js
new StadtnaviLocationSelector(divId, options);
```
#### Arguments

- `divId`: ID of the `<div>` element into which the interactive map is placed.

#### Options

- `tileUrl`: Leaflet-compatible URL for the background map. Ignored if `wms` (see below) is configured instead.
  Default: `https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png`  
  *Note*: If you want to use the stadtnavi tiles, your domain needs to be whitelisted. Please get in touch with
  mitmachen@herrenberg.stadtnavi.de to have this done.
- `tileSize`: What size the tiles have in pixels.  
  Default: `256`
- `center`: Initial center point of the map.  
  Default: `{ lat: 48.7840, lng: 9.1829 }`
- `attribution`: The information text at the bottom right corner of the map.  
  Default: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors`
- `maxZoom`: Maximum zoom level allowed.  
  Default: 18
- `pinPrimaryColor`: Fill color of the map marker.  
  Default: `#f8dd14`
- `pinSecondaryColor`: Border color of the map marker  
  Default: `#000000`
- `onLocationSelected`: Function that takes a single argument with the location selected by the user.  
  Default: `(location) => {}`
- `reverseGeocode`: Function that takes two arguments `lat` and `lng` and returns a `Promise` of a formatted address.  
  Default: An implementation that uses the stadtnavi reverse geocoder.
- `wms.url`: The URL of a WMS service to fetch map tiles from.
  Default: `null`
- `wms.layers`: Comma-separated list of layers for the map tiles
  Default: `null`
- `wms.format`: Image format to use
  Default: `image/png`


## Tiny widget

If you don't have the space for a full-size widget, there is alsow the tiny one available.

Demo: https://tiles.stadtnavi.eu/widget/tiny.html

### Usage

![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/stadtnavi/stadtnavi-widget?label=latest%20version)

- Add latest CSS file to HTML page: `https://tiles.stadtnavi.eu/widget/${version}/tiny-widget.css`
- Add latest JS: `https://tiles.stadtnavi.eu/widget/${version}/tiny-widget.js`

#### `TinyRouteSelector`

Displays a very small widget to select a start, destination and time.

To use it create a `<div>`, give it an ID and execute the following JS:

```js
new TinyRouteSelector(divId, options);
```
#### Arguments

- `divId`: ID of the `<div>` element into which the widget is placed.

#### Options

- `baseUrl`: The base URL of your Digitransit instance.
  Default: `https://herzberg-elster.bbnavi.de`
- `logoUrl`: The URL of the logo image to display in the header.
  Default: `https://bbnavi.de/wp-content/uploads/2021/09/bbnavi-logo-weiss-transparent.png`
- `focus`: A JSON object containing the properties `lat` and `lng`. This sets the focus point of the search and decides if, for example, a search for "anger" should return "Angermünde" or "Am Anger, Herzberg (Elster)" in first place.
  Default: `{ lat: 51.6927, lng: 13.2354 }` (Herzberg (Elster))
- `destination`: A JSON object containing the properties `label`, lat` and `lng`. This pre-selects the destination of the widget.
  Default: `{ }` 

### Development

To develop this widget, you should install the required packages via 

```sh
npm install
```

To generate the dist and test locally, run

```sh
grunt
```

When pushing to the main branch, a new version is published via github actions at https://tiles.stadtnavi.eu/widget/.

If you push a git tag a new release with a stable release is automatically created.

