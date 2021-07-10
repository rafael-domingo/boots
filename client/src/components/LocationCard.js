import React from 'react';
import FrenchTruck from '../assets/frenchtruck.jpg';
export default function LocationCard() {
    const divStyle = {
        height: '100%',
        width: '90%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        borderRadius: '2em',
        margin: '10px',
        boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.5)'
    }

    const textDivStyle = {
        width: '75%',
        color: 'rgb(64, 112, 191)',      
        fontSize: '1.5em',
        lineHeight: '0',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        textAlign: 'left'

    }

    const nameStyle = {
        fontWeight: 'bold',
        width: '100%'
    }

    const addressStyle = {
        width: '100%'
    }

    const imgStyle = {
        borderRadius: '2em',
        width: 'auto',
        height: '100%',
        objectFit: 'cover'

    }
    const imgDivStyle = {
        width: '25%',
        height: '10em',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
    return (
        <div style={divStyle}>
            <div style={imgDivStyle}>
                <img style={imgStyle}src={FrenchTruck} />
            </div>
            <div style={textDivStyle}>
                <p style={nameStyle}>French Truck Coffee</p>
                <p style={addressStyle}>4950 Government St</p>
            </div>
           
        </div>
    )
}