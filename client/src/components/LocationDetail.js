import React from 'react';
import LocationPicture from '../assets/frenchtruckpic.jpg';
export default function LocationDetail() {

    const divStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexWrap: 'wrap',

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
            <img style={locationImageStyle} src={LocationPicture} />
            <div style={locationTextDivStyle}>
                <p style={locationNameStyle}>French Truck Coffee</p>
                <p style={locationAddressStyle}>4950 Government St, Baton Rouge, LA</p>
            </div>
            
        </div>
    )
}