import React from 'react';
import LargeMap from '../components/LargeMap';
import LocationDetail from '../components/LocationDetail';

export default function Location() {

    const divStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    }

    const mapDivStyle = {
        height: 'auto',
        width: '100%'
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

    return (
        <div style={divStyle}>
            <div style={mapDivStyle}>
                <LargeMap />
            </div>
            <div style={locationDivStyle}>
                <LocationDetail />
            </div>
        </div>
    )   
}