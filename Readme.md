## stadtnavi widget

Demo: https://stadtnavi.github.io/stadtnavi-widget/

### Usage

![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/stadtnavi/stadtnavi-widget?label=latest%20version)

- Add latest CSS file to HTML page: `https://stadtnavi.github.io/stadtnavi-widget/${version}/stadtnavi-widget.css`
- Add latest JS: `https://stadtnavi.github.io/stadtnavi-widget/${version}/stadtnavi-widget.js`


```js
new StadtnaviLocationSelector(divId, options);
```

#### Options

`options` is a JSON object with the following possible keys:

- `tileUrl`: Leaflet-compatible URL for the background map.  
  Default: `https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png`  
  *Note*: If you want to use the stadtnavi tiles, your domain needs to be whitelisted. Please get in touch with
  holger.bruch@systect.de to have this done.
- `tileSize`: What size the tiles have in pixels.  
  Default: `256`
- `center`: Initial center point of the map.  
  Default: `{ lat: 48.7840, lng: 9.1829 }`
- `attribution`: The information text at the bottom right corner of the map.
   Default: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
- `maxZoom`: 
   Default: 18,
- `onLocationSelected`: Function that takes a single argument with the location selected by the user.  
   Default: `(location) => {}`

