import React from 'react';
import LocationPicture from '../assets/frenchtruckpic.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { setCenter, setFitBounds, setZoom } from '../redux/maps';
import HalfStar from '../assets/halfstar.png';
import FullStar from '../assets/filledstar.png';
import EmptyStar from '../assets/emptystar.png';
import Dollar from '../assets/dollar.png';

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
        height: '90%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        borderRadius: '50px',


    }

    const locationTextDivStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        padding: '2em',
        color: 'rgb(64, 112, 191)',
        overflow: 'auto'
       

    }
    const locationImageStyle = {
        width: '100%',
        height: '35vh',
        objectFit: 'cover'
    }

    const locationNameStyle = {
        fontSize: '3em',
        lineHeight: '0em',
        fontWeight: 'bold',
        width: '100%',
        
    }
    
    const locationAddressStyle = {
        fontSize: '2em',
        fontWeight: 'normal',
        width: '100%',
        lineHeight: '0em'
    }

    const categoryArrayStyle = {
        width: 'auto',
        margin: '1em',
        padding: '1em',
        borderRadius: '2em',
        backgroundColor: 'rgb(64, 112, 191)',
        color: 'white'
    }
    // create JSX for price symbols
    var priceArray = [];
    if (locationDetailState.price !== undefined) {
        for (let index = 0; index < locationDetailState.price.length; index++) {
            priceArray.push(<img style={{height: '100%', width: 'auto'}} src={Dollar}/>)        
        }
    }
    
    // create JSX for rating symbols
    var ratingArray = [];
    if (locationDetailState.rating !== undefined) {
        for (let index = 0; index < Math.floor(locationDetailState.rating); index++) {
            ratingArray.push(<img style={{height: '100%', width: 'auto'}} src={FullStar} />)        
        }
        if (locationDetailState.rating % Math.floor(locationDetailState.rating) !== 0) {
            ratingArray.push(<img style={{height: '100%', width: 'auto'}} src={HalfStar} />)
        }
        if (ratingArray.length < 5) {
            for (let index = ratingArray.length; index < 5; index++) {
                ratingArray.push(<img style={{height: '100%', width: 'auto'}} src={EmptyStar} />)
                
            }
        }
    }

    // create JSX for phone number
    var phoneArray = [];
    if (locationDetailState.display_phone !== undefined) {
        phoneArray.push(<p>{locationDetailState.display_phone}</p>)
    }

    // create JSX for categories
    var categoryArray = [];
    if (locationDetailState.categories !== undefined) {
        locationDetailState.categories.map(category => {
            categoryArray.push(
                <div style={categoryArrayStyle}>
                    {category.title}
                </div>
                )
        })
       
    }
   
    return (
        <div style={divStyle}>
            <img style={locationImageStyle} src={locationDetailState.image_url} />
            <div style={{display: 'flex', height: 'auto', justifyContent: 'flex-start'}}>
                {categoryArray}
            </div>
            <div style={locationTextDivStyle}>
                <p style={locationNameStyle}>{locationDetailState.name}</p>
                {
                    locationDetailState.location.display_address.map(item => {
                        return (
                            <p style={locationAddressStyle}>{item}</p>
                        )
                    })
                }
              
                <div style={{width: '100%', height: '2em'}}>
                {priceArray}
                </div>
                <div style={{width: '100%', height: '2em'}}>
                {ratingArray}
                </div>
                {phoneArray}
            </div>  
            
        </div>
    )
}