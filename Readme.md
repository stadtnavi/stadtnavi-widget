## stadtnavi widget

Demo: https://stadtnavi.github.io/stadtnavi-widget/

### Usage

![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/stadtnavi/stadtnavi-widget?label=latest%20version)

- Add latest CSS file to HTML page: `https://stadtnavi.github.io/stadtnavi-widget/${version}/stadtnavi-widget.css`
- Add latest JS: `https://stadtnavi.github.io/stadtnavi-widget/${version}/stadtnavi-widget.js`
- Create a container `<div>` and use CSS to give the div a height of at least `200px`.

There are two widgets available:

#### `StadtnaviAddressBox`

Displays a map preview of an arbitrary address in Baden-Württemberg and a link
to the pre-filled stadtnavi application so that a route search can be started easily.

To use it create a `<div>`, give it an ID and at least 100px height and execute the following JS:
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

- `tileUrl`: Leaflet-compatible URL for the background map.  
  Default: `https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png`  
  *Note*: If you want to use the stadtnavi tiles, your domain needs to be whitelisted. Please get in touch with
  mitmachen@herrenberg.stadtnavi.de to have this done.
- `tileSize`: What size the tiles have in pixels.  
  Default: `256`
- `attribution`: The information text at the bottom right corner of the map.  
  Default: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors`
- `maxZoom`: Maximum zoom level allowed.  
  Default: 18

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

- `tileUrl`: Leaflet-compatible URL for the background map.  
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
- `onLocationSelected`: Function that takes a single argument with the location selected by the user.  
  Default: `(location) => {}`
- `reverseGeocode`: Function that takes two arguments `lat` and `lng` and returns a promise of a formatted address.  
  Default: An implementation that uses the stadtnavi reverse geocoder.
