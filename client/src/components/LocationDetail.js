import React from 'react';
import LocationPicture from '../assets/frenchtruckpic.jpg';
import Maps from '../components/Maps';

export default function LocationDetail() {

    const divStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexWrap: 'wrap',

    }
    const locationDivStyle = {
        width: '40%',
        height: '90vh',
        // display: 'flex',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        // flexWrap: 'wrap',
        borderRadius: '50px',
        backgroundColor: 'rgb(244,244,244)',
        margin: '5vh',
        boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.5)',

    }

    const locationTextDivStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        padding: '2.5vh',
        color: 'rgb(64, 112, 191)',
       

    }
    const locationImageStyle = {
        width: '100%',
        height: 'auto',
        borderRadius: '50px'
    }

    const mapDivStyle = {
        height: 'auto',
        width: '100%'
    }

    const locationNameStyle = {
        fontSize: '3em',
        fontWeight: 'bold'
    }
    
    const locationAddressStyle = {
        fontSize: '2em',
        fontWeight: 'normal'
    }
    return (
        <div style={divStyle}>
            <div style={mapDivStyle}>
                <Maps />
            </div>
            <div style={locationDivStyle}>
                <img style={locationImageStyle} src={LocationPicture} />
                <div style={locationTextDivStyle}>
                    <p style={locationNameStyle}>French Truck Coffee</p>
                    <p style={locationAddressStyle}>4950 Government St, Baton Rouge, LA</p>
                </div>
              
            </div>
        </div>
    )
}