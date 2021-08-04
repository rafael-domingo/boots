import React, { useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useSelector, useDispatch } from 'react-redux';
import maps from '../redux/maps';

require('dotenv').config();

export default function Maps({ location }) {
  const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const googleMapRef = React.createRef()
  const googleMap = useRef(null);
  const marker = useRef(null);
  const bounds = useRef(null);
  const directionService = useRef(null);
  const directionRender = useRef(null);

  const mapState = useSelector(state => state.map);
  var location = [];
  if (mapState.tripLocationArray.length >  0) {
    mapState.tripLocationArray.map(item => {
      location.push({
        lat: item.coordinates.latitude,
        lng: item.coordinates.longitude
      });
    })
  } else if (mapState.cityLocationArray.length > 0) {
    mapState.cityLocationArray.map(item => {
      location.push(item.location);
    })
  } 
  if (mapState.searchLocationArray.length > 0) {
    mapState.searchLocationArray.map(item => {
      location.push(item);
    })
  }
  
  console.log(location);
  const searches = mapState.searchLocationArray;
  const width = mapState.windowWidth;
  const directions = mapState.directions;
  const center = mapState.center;
  const zoom = mapState.zoom;
  const setFitBounds = mapState.fitBounds;
  const mapStyle = {
    width: '100%',
    height: '100%',
    zIndex: '-1',
    position: 'absolute'
  }
  var initialCenter = null;
  
  React.useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
    })
    // Prevent redundant API calls by checking if googleMap is null
    if (googleMap.current === null) {
      loader.load().then(() => {
        // instantiate instance of google map
        googleMap.current = createGoogleMap(location)
       
        // create bounds for map to use for markers 
        bounds.current = new window.google.maps.LatLngBounds();  
       
        if (directions === true) {
          // instantiate directions service and renderer
          directionService.current = new window.google.maps.DirectionsService();
          directionRender.current = new window.google.maps.DirectionsRenderer();
          createDirections(location)
          
        }
        createMarker(location)
        // Auto fit and Auto zoom based on markers (with 500px padding)
        fitBounds();   

      })
    } 
    // If googleMap is not null, modify the map with updated views or markers
    else {      
      createMarker(location)

      if (setFitBounds) {
        fitBounds()
      } else {
        centerMap(center, zoom)
        
        
      }
    }
   
  }, [location])


    const createGoogleMap = (location) => {
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
   return new window.google.maps.Map(googleMapRef.current, mapOptions);
    }

    const createMarker = (location) => {
      location.map((loc) => {
        // add location to bounds for map to consider
        bounds.current.extend(loc)
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
          label: 'A',
          // icon: svgMarker,
          animation: window.google.maps.Animation.DROP,
          map: googleMap.current
        })
      })
     
    }

    const createDirections = (location) => {
      var start = location[0];
      var end = location[location.length - 1];
      var waypoints = [];
      if (location.length > 2) {
        for (let index = 1; index < location.length; index++){
          waypoints.push({
            location: location[index],
            stopover: true
          })
         
        }
      }
      var request = {
        origin: start,
        destination: end,
        waypoints: waypoints,
        travelMode: 'DRIVING'
      }
      directionService.current.route(request, function(result, status) {
        if (status == 'OK') {
          console.log(result)
          directionRender.current.setDirections(result)
        }
      })
      directionRender.current.setMap(googleMap.current);
            directionRender.current.setOptions({
              preserveViewport: true
            })
    }

    const centerMap = (location, zoom) => {
      googleMap.current.panTo(location)
      googleMap.current.setZoom(zoom);
    }

    const fitBounds = () => {
      googleMap.current.panToBounds(bounds.current)
      googleMap.current.fitBounds(bounds.current, {right: width / 2})
      


    }


  return (
    <div
      id="google-map"
      ref={googleMapRef}
      style={mapStyle}
    />
  )
}