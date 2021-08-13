import React from 'react';
import LocationPicture from '../assets/frenchtruckpic.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { setCenter, setFitBounds, setZoom } from '../redux/maps';
export default function LocationDetail() {
    const locationDetailState = useSelector(state => state.user.locationDetail);
    const dispatch = useDispatch()
    dispatch(setFitBounds(false))
    dispatch(setCenter({
        lat: locationDetailState.coordinates.latitude,
        lng: locationDetailState.coordinates.longitude
    }))
    dispatch(setZoom(18))
    const divStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexWrap: 'wrap',

    }

    const locationTextDivStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        padding: '2.5vh',
        color: 'rgb(64, 112, 191)',
       

    }
    const locationImageStyle = {
        width: 'auto',
        height: '50vh',
        borderRadius: '50px'
    }

    const locationNameStyle = {
        fontSize: '3em',
        fontWeight: 'bold'
    }
    
    const locationAddressStyle = {
        fontSize: '2em',
        fontWeight: 'normal'
    }
    return (
        <div style={divStyle}>
            <img style={locationImageStyle} src={locationDetailState.image_url} />
            <div style={locationTextDivStyle}>
                <p style={locationNameStyle}>{locationDetailState.name}</p>
                <p style={locationAddressStyle}>{locationDetailState.location.display_address[0]}</p>
            </div>
            
        </div>
    )
}