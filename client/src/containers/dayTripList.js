import React from 'react';
import FlatMaps from '../components/FlatMaps';
import Maps from '../components/Maps';
import TripCard from '../components/TripCard';


export default function DayTripList() {
    const divStyle = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexWrap: 'wrap',

    }
    const cityDivStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'rgba(64, 112, 191, 0.6)'
    }
    const tripCardStyle = {
        display: 'flex',
        height: '50%',
        width: '75%',        
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        position: 'absolute',
        marginRight: '5vw'
    }
    return (
        <div style={divStyle}>
            <Maps />
            <div style={tripCardStyle}>
                <TripCard />
                <TripCard />
                <TripCard />
                
            </div>
        </div>
    )
}