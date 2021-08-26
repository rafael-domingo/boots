import React from 'react';
import Profile from '../assets/profile.jpeg';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
export default function AppDrawer({drawer, setDrawer}) {
    console.log(drawer)
    const divStyle = {
        width: '25vw',
        height: '100%',
        backgroundColor: 'rgba(103, 140, 203, 0.8)',
        display: 'flex',
        justifyContent: 'flex-start',
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
        <Drawer anchor='left' open={drawer} onClose={() => setDrawer(false)}>
            
        <div style={divStyle} onClick={() => setDrawer(false)}>
            <IconButton onClick={() => setDrawer(false)}>
                <ArrowBackIcon style={{color: 'white'}}/>
            </IconButton>
            <div style={profileDivStyle}>
                <img src={Profile} style={profilePicStyle}/>
                <p style={profileNameStyle}>Rafael Domingo</p>
            </div>
            <div style={buttonsDivStyle}>
                <p style={buttonsStyle} onClick={() => setDrawer(false)}>Daytrips</p>
                <p style={buttonsStyle}>Profile</p>
                <p style={buttonsStyle}>Settings</p>
                <p style={buttonsStyle}>Logout</p>
            </div>
           
        </div>
        </Drawer>
    )
}