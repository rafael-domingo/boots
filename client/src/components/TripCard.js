import React from 'react';


export default function TripCard({ handleHoverExit, handleHover, handleClick, tripDetails }) {

    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',  
        width: '100%',
        height: 'auto',
        margin: '10px',
        backgroundColor: 'rgba(64,112,191,1)',
        borderRadius: '5em',
        color: 'white'
    }

    const textStyle = {
        width: '100%',
        fontSize: '3em'
    }
    return (
        <div style={divStyle} onClick={() => handleClick(tripDetails)} onMouseLeave={() => handleHoverExit(tripDetails.location)} onMouseEnter={() => handleHover(tripDetails.location)}>
            <p style={textStyle}>{tripDetails.name}</p>
        </div>
    )
}