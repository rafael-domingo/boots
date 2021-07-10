import React from 'react';
import LocationCard from '../components/LocationCard';
import Maps from '../components/Maps';

export default function DayTripView() {
    const divStyle = {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        // flexWrap: 'wrap'
    }

    const mapDivStyle = {
        height: 'auto',
        width: '50%'
    }

    const locationsDivStyle = {
        width: '50%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
        
    }

    const cityNameStyle = {
        color: 'rgb(64, 112, 191)',
        fontSize: '5em',
        fontWeight: 'normal'

    }
    return (
        <div style={divStyle}>
            <div style={mapDivStyle}>
                <Maps />
            </div>
            <div style={locationsDivStyle}>
                <h1 style={cityNameStyle}>Baton Rouge</h1>
                <LocationCard />
                <LocationCard />
                <LocationCard />
                <LocationCard />
                <LocationCard />
             
            </div>
        </div>
    )
}