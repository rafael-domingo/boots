import React, { Component, createRef } from 'react'

export default class FlatMaps extends Component {
  googleMapRef = React.createRef()
  googleMapRef1 = React.createRef()
 
  componentDidMount() {
    const googleScript = document.createElement('script')
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCSlcbviYPukMnDgd9uEy3D87gqFlP2nEo&v=beta`
    window.document.body.appendChild(googleScript)

    googleScript.addEventListener('load', () => {
      this.googleMap = this.createGoogleMap()
      this.marker = this.createMarker()
    })
  }

  createGoogleMap = () => {

    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 20,
      mapId: '29a0d968ac095d5f',
      center: {
        lat: 35.6594945,
        lng: 139.6999859,
      },
      disableDefaultUI: true,
    })
    new window.google.maps.Map(this.googleMapRef1.current, {
        zoom: 20,
        mapId: '29a0d968ac095d5f',
        center: {
          lat: 35.6594945,
          lng: 139.6999859,
        },
        disableDefaultUI: true,
      })
  }

  createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: 35.6594945, lng: 139.6999859 },
      map: this.googleMap,
    })

  render() {
    return (
        <div style={{width: '100vw', height: '100vh'}}>
        <div
        id="google-map"
        ref={this.googleMapRef}
        style={{ width: '50%', height: '50%', position: 'absolute' }}
      />
      <div
        id="google-map1"
        ref={this.googleMapRef1}
        style={{ width: '50%', height: '50%', right: '0', position: 'absolute' }}
      />
        </div>
     
     
    )
  }
}