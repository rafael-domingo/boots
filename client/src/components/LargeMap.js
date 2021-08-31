import React, { Component, createRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { AmbientLight, BoxBufferGeometry, DirectionalLight, Mesh, MeshNormalMaterial, Scene, Sprite, Object3D } from "three";
import { latLngToVector3, ThreeJSOverlayView } from "@googlemaps/three";
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

  // const scene = new Scene();

  // const box = new Mesh(
  //   new BoxBufferGeometry(10, 50, 10),
  //   new MeshNormalMaterial(),
  // );

  // box.position.copy(latLngToVector3(mapOptions.center));
  // box.position.setY(25);
  // scene.add(box);

  // const box1 = new Mesh(
  //   new BoxBufferGeometry(10, 50, 10),
  //   new MeshNormalMaterial(),
  // );

  // box1.position.copy(latLngToVector3(mapOptions.center));
  // box1.position.setY(100);
  // scene.add(box1);
  
  // new ThreeJSOverlayView({
  //   scene, map
  // });
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
  
  // const scene = new Scene();
  
  // const ambientLight = new AmbientLight(0xffffff, 0.75);
  // scene.add(ambientLight);
  // const directionalLight = new DirectionalLight(0xffffff, 0.25);
  // directionalLight.position.set(0, 10, 50);
  // scene.add(directionalLight);
  // // Load the model.
  // const loader = new GLTFLoader();
  // const url =
  //   "https://raw.githubusercontent.com/googlemaps/js-samples/master/assets/pin.gltf";
  // loader.load(url, (gltf) => {
  //   gltf.scene.scale.set(10, 10, 10);
  //   gltf.scene.rotation.x = Math.PI / 2;
  //   scene.add(gltf.scene);
  //   let { tilt, heading, zoom } = mapOptions;

  //   const animate = () => {
  //     if (tilt < 67.5) {
  //       tilt += 0.5;
  //     } else if (heading <= 360) {
  //       heading += 0.05;
  //       // zoom -= 0.0005;
  //     } else {
  //       heading = 0;
  //       // zoom += 0.0005;
  //       // return;
  //     }
      
  //     map.moveCamera({ tilt, heading, zoom });
   
  //     requestAnimationFrame(animate);
  //   };
  //   requestAnimationFrame(animate);
  // });
  // new ThreeJSOverlayView({
  //   map,
  //   scene,
  //   anchor: { ...{ lat: 35.6594955, lng: 139.699 }, altitude: 100 },
  // });
 
 
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