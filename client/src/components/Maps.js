import React, { useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useSelector, useDispatch } from 'react-redux';
import maps, { setDirections } from '../redux/maps';
import { setAutoComplete } from '../redux/tripBuilder';
import { setTravelTime } from '../redux/currentTrip';
import { setLocationDetail } from '../redux/user';

require('dotenv').config();

export default function Maps({ handleClick, edit, setEdit}) {

  // USE REFS
  const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const googleMapRef = React.createRef()
  const googleMap = useRef(null);
  let tripMarkers = useRef([]);
  let searchMarkers = useRef([]);
  const bounds = useRef(null);
  const directionService = useRef(null);
  const directionRender = useRef(null);
  const [trackState, setTrackState] = React.useState(true);

  // STATE MANAGEMENT
  const dispatch = useDispatch();
  const mapState = useSelector(state => state.map);

  // Set up trip location array to draw markers
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

  // Set up search location array to draw markers
  var searchLocation = [];
  if (mapState.searchLocationArray.length > 0) {
    mapState.searchLocationArray.map(item => {
      searchLocation.push({
        lat: item.coordinates.latitude,
        lng: item.coordinates.longitude
      });
    })
  } 

  // Set up state variables
  const directions = mapState.directions;
  const center = mapState.center;
  const zoom = mapState.zoom;
  const setFitBounds = mapState.fitBounds;
  const transportation = mapState.transportation;

  // Map component styling
  const mapStyle = {
    width: '45%',
    height: '90%',
    borderRadius: '2em',
    left: '2.5%',
    top: '5%',
    bottom: '5%',
    position: 'absolute',
    boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.5)'
  }
  
  React.useEffect(() => {  
    const loader = new Loader({
      apiKey: apiKey,
      id: '2d',
      version: "beta",
    })
    // Prevent redundant API calls by checking if googleMap is null
    if (googleMapRef.current === null || googleMap.current === null) {
      loader.load().then(() => {
        console.log('null')
        console.log(googleMapRef)
        // instantiate instance of google map
        if (location.length === 0 && searchLocation.length === 0) {
          googleMap.current = createGoogleMap(mapState.cityLocation) 
          bounds.current = new window.google.maps.LatLngBounds(); 
      
        } else {
          googleMap.current = createGoogleMap(mapState.cityLocation)      
          // create bounds for map to use for markers 
          bounds.current = new window.google.maps.LatLngBounds(); 
          createMarker(location, 'trip');
          // Auto fit and Auto zoom based on markers (with 500px padding)
          if (setFitBounds) {        
            fitBounds()
          } else {       
            centerMap(center, zoom)
          }    
        }
        directionService.current = new window.google.maps.DirectionsService();
        directionRender.current = new window.google.maps.DirectionsRenderer({ suppressMarkers: true });
                 
        if (directions === true) {
          // instantiate directions service and renderer
          if (trackState) {
            createDirections(location)
            // setTrackState(!trackState)
          }
          
         

        }
    
        
      }).catch((error) => {
        console.log(error)
      })
    } 
    else if (edit) {
      // reset bounds so viewport is correct
      bounds.current = new window.google.maps.LatLngBounds(); 
      if (tripMarkers.current.length > 0) {
        removeMarkers(tripMarkers.current)
      } 
      if (location.length > 0) {
        createMarker(location, 'trip')      
      }
      createDirections(location)      
      setEdit(false)
      fitBounds()
    }
    // If googleMap is not null, modify the map with updated views or markers
    else {       
      console.log('not null')
      // reset bounds so viewport is correct
      bounds.current = new window.google.maps.LatLngBounds(); 
      if (searchMarkers.current.length > 0) {
        removeMarkers(searchMarkers.current)
      } 
      if (tripMarkers.current.length > 0) {
        removeMarkers(tripMarkers.current)
      } 
      if (location.length > 0) {
        createMarker(location, 'trip')      
      }

      if (searchLocation.length > 0) {        
        createMarker(searchLocation, 'search')       
      } 
      // Determine how to set viewport
      if (location.length === 0 && searchLocation.length === 0) {
        centerMap(mapState.cityLocation, 12)
      }
      else if (setFitBounds) {        
        fitBounds()
      } else {       
        centerMap(center, zoom)
      }    
    }   

  }, [location, mapState, center, searchLocation])



    const createGoogleMap = (location) => {
      console.log(location)
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
      zoom: 12,
      styles: styles,
      disableDefaultUI: true
    }
   return new window.google.maps.Map(googleMapRef.current, mapOptions);
    }

    const createMarker = (location, type) => {
      location.map((loc, index) => {
        // add location to bounds for map to consider
        bounds.current.extend(loc)
       
        // Create label for marker
        var label = index + 1
        label = label.toString()

        // Determine which markers to draw if displaying Trip markers or Search markers
        if (type === 'trip') {          
          const marker = new window.google.maps.Marker({
            position: loc,
            label: label,            
            map: googleMap.current
          })
          // Make marker clickable so detail view shows up
          marker.addListener('click', () => {
            const locationDetail = mapState.tripLocationArray[index]
            dispatch(setLocationDetail(locationDetail))
            handleClick()            
          })
          tripMarkers.current.push(marker)
        } 
        else if (type === 'search') {           
           const marker = new window.google.maps.Marker({
            position: loc,
            label: label,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue.png",
              labelOrigin: new window.google.maps.Point(15,10)
            },            
            map: googleMap.current
          })
          // Make marker clickable so detail view shows up
          marker.addListener('click', () => {
            const locationDetail = mapState.searchLocationArray[index]
            dispatch(setLocationDetail(locationDetail))
            handleClick()            
          })
          searchMarkers.current.push(marker)
        }        
      })
     
    }

    const removeMarkers = (markers) => {      
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
        
      }      
      return markers
    }

    const createDirections = (location) => {
      var start = location[0];
      var end = location[location.length - 1];
      var waypoints = [];
      var legs = [];
      if (location.length > 2) {
        for (let index = 1; index < location.length - 1; index++){
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
        travelMode: transportation
      }
      directionService.current.route(request, function(result, status) {
        if (status == 'OK') {
          result.routes[0].legs.map(leg => {
            legs.push({
              duration: leg.duration.text,
              distance: leg.distance.text
            })
          })
          directionRender.current.setDirections(result)
          dispatch(setTravelTime(legs))
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
      googleMap.current.fitBounds(bounds.current)      
    }


  return (
    <div
      id="google-map"
      ref={googleMapRef}
      style={mapStyle}
    />
  )
}
