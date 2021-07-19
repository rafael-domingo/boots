import React from 'react';
import FrenchTruck from '../assets/frenchtruck.jpg';
import { useDispatch } from 'react-redux';
import { setCurrentTrip } from '../redux/user';

export default function LocationCard({ name = "French Truck", picture = FrenchTruck, location = '4950 Government St', locationInfo }) {
    const dispatch = useDispatch();
  
    const divStyle = {
        height: '100%',
        width: '90%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        borderRadius: '2em',
        margin: '10px',
        boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.5)'
    }

    const textDivStyle = {
        width: '50%',
        color: 'rgb(64, 112, 191)',      
        fontSize: '1.5em',
        lineHeight: '0',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        textAlign: 'left'

    }

    const nameStyle = {
        fontWeight: 'bold',
        width: '100%'
    }

    const addressStyle = {
        width: '100%'
    }

    const imgStyle = {
        borderRadius: '2em',
        width: '100%',
        height: '100%',
        objectFit: 'cover'

    }
    const imgDivStyle = {
        width: '25%',
        height: '10em',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }

    const buttonDivStyle = {
        width: '25%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
    return (
        <div style={divStyle}>
            <div style={imgDivStyle}>
                <img style={imgStyle}src={picture} />
            </div>
            <div style={textDivStyle}>
                <p style={nameStyle}>{name}</p>
                <p style={addressStyle}>{location}</p>
            </div>
            <div style={buttonDivStyle}>
                <button onClick={() => {
                    dispatch(setCurrentTrip({locationInfo}))
                }}>+</button>
            </div>
           
        </div>
    )
}