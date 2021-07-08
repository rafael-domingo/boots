import React from 'react';


export default function TripCard() {

    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',  
        width: '50%',
        height: '10em',
        margin: '10px',
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: '20px',
    }

    const textStyle = {
        width: '100%'
    }
    return (
        <div style={divStyle}>
            <h1 style={textStyle}>Baton Rouge</h1>
        </div>
    )
}