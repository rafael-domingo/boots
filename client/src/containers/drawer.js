import React from 'react';
import Profile from '../assets/profile.jpeg';

export default function Drawer() {
    const divStyle = {
        width: '25vw',
        height: '100vh',
        zIndex: '1000',
        backgroundColor: 'rgba(103, 140, 203, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap'

    }

    const profileDivStyle = {
        width: '100%',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

    const buttonsDivStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

    const profilePicStyle = {
        width: '50%',
        height: 'auto',
        borderRadius: '50%'
    }

    const profileNameStyle = {
        width: '100%',  
        color: 'white',
        fontSize: '3em',
        fontWeight: 'bold'    
    }

    const buttonsStyle = {
        width: '100%',
        color: 'white',
        fontSize: '2em'
    }

    return (
        <div style={divStyle}>
            <div style={profileDivStyle}>
                <img src={Profile} style={profilePicStyle}/>
                <p style={profileNameStyle}>Rafael Domingo</p>
            </div>
            <div style={buttonsDivStyle}>
                <p style={buttonsStyle}>Daytrips</p>
                <p style={buttonsStyle}>Profile</p>
                <p style={buttonsStyle}>Settings</p>
                <p style={buttonsStyle}>Logout</p>
            </div>
           
        </div>

    )
}