import React from 'react';


export default function Logo() {

    const logoStyle = {
        fontFamily: 'phosphate',
        color: 'rgba(64, 112, 191)',
        position: 'absolute',
        left: '20px',
        top: '10px',
        fontSize: '3em',
        lineHeight: '0em'
    
    }
    return (
        <div>
            <h1 style={logoStyle}>BOOTS</h1>
        </div>
    )
}