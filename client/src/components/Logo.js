import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function Logo({setDrawer, drawer, color="rgba(64, 112, 191)", back=false}) {
    const windowWidth = window.innerWidth
    const divStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        zIndex: '100',
        position: 'absolute',
        left: '0',
        top: '0'
    }

    const logoStyle = {
        fontFamily: 'phosphate',
        color: color,
        // position: 'relative',
        // left: '20px',
        // top: '10px',
        fontSize: '3em',
        lineHeight: '0em'
    
    }
    return (
        <div style={divStyle}>
            <IconButton onClick={() => setDrawer(!drawer)} style={{color: color}}>
                {
                    !back && (
                        <MenuIcon/>
                    )
                }
                {
                    back && (
                        <ArrowBackIcon/>
                    )
                }
            </IconButton>
            {
                windowWidth > 400 ? (<h1 style={logoStyle}>BOOTS</h1>) : null
            }    
            
        </div>
    )
}