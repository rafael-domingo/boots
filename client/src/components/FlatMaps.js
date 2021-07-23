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
      this.googleMap = this.createGoogleMap(this.props.location)
      this.bounds = this.createBounds();  
      if (this.props.location.length == 1) {
        this.createMarker(this.props.location)
        this.googleMap.setCenter(this.props.location[0])
        this.googleMap.setZoom(15);
      } else {
        this.createMarker(this.props.location)
        this.googleMap.fitBounds(this.bounds)
        this.googleMap.panToBounds(this.bounds)
      }
    })
  }

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
        this.googleMap.fitBounds(this.bounds)
        this.googleMap.panToBounds(this.bounds)
      }
   
    })
  }

  createGoogleMap = (location) => {
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

  createBounds = () => {
    return new window.google.maps.LatLngBounds();
  }

  createMarker = (location) => {
    console.log(location)
    location.map((loc) => {
      console.log(loc)
      this.bounds.extend(loc)
      new window.google.maps.Marker({
        position: loc,
        map: this.googleMap
      })
    })
   
  }


  render() {
    const mapStyle = {
      width: '100vw',
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
