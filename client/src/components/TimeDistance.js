import React from 'react';

export default function TimeDistance({time, distance}) {
    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        height: 'auto'
    }
    const textStyle = {
        width: '50%',
        color: 'rgb(64, 112, 191)',
        textAlign: 'center'
    }
    const lineStyle = {
        width: '0',
        height: '2em',
        borderRight: '3px dashed rgb(64, 112, 191)'
    }
    const textDivStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    return (
        <div style={divStyle}>
            <div style={lineStyle}></div>
            <div style={textDivStyle}>
                <p style={textStyle}>{distance}</p>
                <p style={textStyle}>{time}</p>
            </div>
           
            {/* <div style={lineStyle}></div> */}
        </div>
    )
}