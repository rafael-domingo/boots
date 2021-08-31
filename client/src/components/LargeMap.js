import React, { Component } from 'react'
import { Loader } from "@googlemaps/js-api-loader"
require('dotenv').config();
export default class LargeMap extends Component {

  googleMapRef = React.createRef()
  componentDidMount() {
    
    const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    // Load Google Maps API before drawing the map
    const loader = new Loader({
      apiKey: apiKey,
      id: '2d',
      version: "beta",
      
    });
    // Draw the map once the promise is fulfilled
    loader.load().then(() => {
      this.googleMap = this.createGoogleMap(this.props.location)
    });
    

  }

  componentDidUpdate() {
    
    const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    // Load Google Maps API before drawing the map
    const loader = new Loader({
      apiKey: apiKey,
      version: "beta",
      
    });
    // Draw the map once the promise is fulfilled
    loader.load().then(() => {
      this.googleMap = this.createGoogleMap(this.props.location)
    });
  }

  createGoogleMap = (location) => {

  let map;
  const mapOptions = {
    tilt: 0,
    heading: 0,
    zoom: 17,
    center: { lat: 37.7878281, lng: -122.4028766 },
    mapId: "15431d2b469f209e",
    // disable interactions due to animation loop and moveCamera
    disableDefaultUI: true,
    gestureHandling: "greedy",
    keyboardShortcuts: false,
  };


  map = new window.google.maps.Map(this.googleMapRef.current, mapOptions);

    var { tilt, heading, zoom } = mapOptions;

     const animate = () => {
      if (tilt < 67.5) {
        tilt += 0.5;
      } else if (heading <= 360) {
        heading += 0.05;
        // zoom -= 0.0005;
      } else {
        heading = 0;
        // zoom += 0.0005;
        // return;
      }
      
      map.moveCamera({ tilt, heading, zoom });
   
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
 
  }

  createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: 35.6594945, lng: 139.6999859 },
      map: this.googleMap,
    })

  render() {
    const largeMapStyle = {
      width: '100vw',
      height: '100%',
      zIndex: '-1',
      position: 'absolute'
    }

    return (    
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={largeMapStyle}
      />     
    )
  }
}