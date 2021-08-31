import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCenter, setFitBounds, setZoom } from '../redux/maps';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Divider from '@material-ui/core/Divider';
import LaunchIcon from '@material-ui/icons/Launch';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
export default function LocationDetail({handleClick}) {
    const locationDetailState = useSelector(state => state.user.locationDetail);
    const dispatch = useDispatch()
    const windowWidth = window.innerWidth
    React.useEffect(() => {
    dispatch(setFitBounds(false))
    dispatch(setCenter({
        lat: locationDetailState.coordinates.latitude,
        lng: locationDetailState.coordinates.longitude
    }))
    dispatch(setZoom(18))
    }, [])
    
    const locationImageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: '0'
    }

    const locationNameStyle = {
        fontSize: '3em',
        fontWeight: 'bold',
        width: '100%',
        
    }
    
    const locationAddressStyle = {
        fontSize: '2em',
        fontWeight: 'normal',
        width: '100%',
    }


    // create JSX for price symbols
    var priceArray = [];
    if (locationDetailState.price !== undefined) {
        for (let index = 0; index < locationDetailState.price.length; index++) {
            priceArray.push(<MonetizationOnIcon fontSize="large"/>)        
        }
    }
    
    // create JSX for rating symbols
    var ratingArray = [];
    if (locationDetailState.rating !== undefined) {
        for (let index = 0; index < Math.floor(locationDetailState.rating); index++) {
            ratingArray.push(<StarIcon fontSize="large"/>)        
        }
        if (locationDetailState.rating % Math.floor(locationDetailState.rating) !== 0) {
            ratingArray.push(<StarHalfIcon fontSize="large"/>)
        }
        if (ratingArray.length < 5) {
            for (let index = ratingArray.length; index < 5; index++) {
                ratingArray.push(<StarOutlineIcon fontSize="large"/>)
                
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
                <Chip
                    label={category.title}
                    color="primary"
                    style={{margin: '5px'}}
                    key={category.title}
                />
                )
                
            })
       
    }
    if (windowWidth < 400) {
        return (
            <div style={{color: 'rgb(64, 112, 191)'}}>

            <Dialog  open={true} onClose={handleClick}>
                <DialogTitle>
                {locationDetailState.name}                
                </DialogTitle>
                <DialogContent>
              
                <img alt={`location-${locationDetailState.name}`} style={locationImageStyle} src={locationDetailState.image_url} />
                {categoryArray}
                {
                        locationDetailState.location.display_address.map(item => {
                            return (
                                <p>{item}</p>
                            )
                        })
                    }                                                         
                    <Divider variant="middle"/>                          
                    <div style={{color: 'rgba(65, 112,191)', width: '100%', margin: '5px'}}>
                    {priceArray}
                    </div>
    
                    <div style={{color: 'rgba(65, 112,191)', width: '100%', margin: '5px'}}>
                    {ratingArray}
                    </div>
                    <div style={{color: 'rgba(65, 112,191)', width: '100%', margin: '5px'}}>
                        {phoneArray}
                    </div>
                    <Divider variant="middle"/>   
                    <DialogActions>
                        <Button onClick={() => window.open(locationDetailState.url)} style={{margin: '5px'}} color="primary" variant="outlined" startIcon={<LaunchIcon/>}>Open in Yelp</Button>
                        <Button variant="contained" color="primary" onClick={() => handleClick()} >Close</Button>
                    </DialogActions>             
                    
                </DialogContent>
            </Dialog>
            </div>

        )
    } else {
        return (
            <Card style={{color: 'rgb(64, 112, 191)', width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{display: 'flex', height: '100%', width: '50%'}}>
                <Fab style={{left: '10%', zIndex: '100'}} color="primary" onClick={() => handleClick()}>
                        <CloseIcon/>
                    </Fab>
    
                <img alt={`location-${locationDetailState.name}`} style={locationImageStyle} src={locationDetailState.image_url} />
    
                </div>
    
                <CardContent>
                
                    {categoryArray}
                    
                    <Divider variant="middle"/>
    
                    <p style={locationNameStyle}>{locationDetailState.name}</p>
                    {
                        locationDetailState.location.display_address.map(item => {
                            return (
                                <p style={locationAddressStyle}>{item}</p>
                            )
                        })
                    }
                    <Divider variant="middle"/>
                    <div style={{width: '100%', margin: '5px'}}>
                    {priceArray}
                    </div>
    
                    <div style={{width: '100%', margin: '5px'}}>
                    {ratingArray}
                    </div>
                    <div style={{width: '100%', margin: '5px'}}>
                        {phoneArray}
                    </div>
                    <Divider variant="middle"/>                
                    <Button onClick={() => window.open(locationDetailState.url)} style={{margin: '5px'}} color="primary" variant="outlined" startIcon={<LaunchIcon/>}>Open in Yelp</Button>
                </CardContent>
     
            </Card>
           
        )
    }
  
}