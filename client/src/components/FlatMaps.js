import React, { Component, createRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
require('dotenv').config();

export default class FlatMaps extends Component {

  googleMapRef = React.createRef()

  componentDidMount() {
    const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

    const loader = new Loader({
      apiKey: apiKey,
    })
    const locationArray = this.props.location
    loader.load().then(() => {
      // instantiate instance of google map
      this.googleMap = this.createGoogleMap(this.props.location)
      // create bounds for map to use for markers 
      this.bounds = this.createBounds();  
      // Determine how many markers to put on map
      if (this.props.location.length == 1) {
        // if only 1 marker, then set zoom level so it's not too close
        this.createMarker(this.props.location)
        this.googleMap.setCenter(this.props.location[0])
        this.googleMap.setZoom(15);
      } else {
        this.createMarker(this.props.location)
        // Auto fit and Auto zoom based on markers (with 500px padding)
        this.googleMap.fitBounds(this.bounds, {right: this.props.width / 2})
        this.googleMap.panToBounds(this.bounds)
 
      }
    })
  }

  // exact copy of component did mount 
  componentDidUpdate() {
    const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

    const loader = new Loader({
      apiKey: apiKey
    })

    loader.load().then(() => {
      this.googleMap = this.createGoogleMap(this.props.location)
      this.bounds = this.createBounds();  
      if (this.props.location.length == 1) {
        this.createMarker(this.props.location)
        this.googleMap.setCenter(this.props.location[0])
        this.googleMap.setZoom(15);
      } else {
        this.createMarker(this.props.location)
        // Auto fit and Auto zoom based on markers (with 500px padding)
        this.googleMap.fitBounds(this.bounds, {right: this.props.width / 2})
        this.googleMap.panToBounds(this.bounds)
      }
   
    })
  }

  createGoogleMap = (location) => {
    // map styles generated from Google tool 
    const styles = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]
    const mapOptions = {
      center: location,
      zoom: 8,
      // mapTypeId: "satellite",
      // tilt: 45,
      styles: styles
    }
   return new window.google.maps.Map(this.googleMapRef.current, mapOptions);

  }

  // used to establish bounds for map
  createBounds = () => {
    return new window.google.maps.LatLngBounds();
  }

  createMarker = (location) => {
    location.map((loc) => {
      // add location to bounds for map to consider
      this.bounds.extend(loc)
      const svgMarker = {
        path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "blue",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        anchor: new window.google.maps.Point(15, 30)
      };
      // draw marker on map
      new window.google.maps.Marker({
        position: loc,
        label: 'label',
        icon: svgMarker,
        animation: window.google.maps.Animation.DROP,
        map: this.googleMap
      })
    })
   
  }


  render() {
    const mapStyle = {
      width: '100%',
      height: '100%',
      zIndex: '-1',
      position: 'absolute'
    }

    return (
      <div 
        id="google-map"
        ref={this.googleMapRef}
        style={mapStyle}
      />
    )
  }
}
