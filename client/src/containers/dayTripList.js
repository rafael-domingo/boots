import React from 'react';
import FlatMaps from '../components/FlatMaps';
import Maps from '../components/Maps';


export default function DayTripList() {
    const divStyle = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',

    }
    const cityDivStyle = {
        height: '100px',
        width: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'rgba(64, 112, 191, 0.6)'
    }

    return (
        <div style={{divStyle}}>
            <div style={{cityDivStyle}}>
                <Maps />
                <h1>Baton Rouge</h1>
            </div>
            
        </div>
    )
}