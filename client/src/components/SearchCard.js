import React from 'react';
import { useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import Chip from '@material-ui/core/Chip';
import { addDestinations } from '../redux/currentTrip';
import { setLocationDetail } from '../redux/user';
export default function SearchCard({ name, picture, location, locationInfo, handleClick}) {
    const dispatch = useDispatch();
    const divStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        // borderRadius: '2em',
        margin: '10px',
        // boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.5)'
    }
    const textDivStyle = {
        width: '100%',
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
        // borderRadius: '2em',
        width: '100%',
        height: '100%',
        objectFit: 'cover'

    }
    const imgDivStyle = {
        width: '20%',
        height: '10em',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }

    // create JSX for categories
    var categoryArray = [];
    if (locationInfo.categories !== undefined) {
        locationInfo.categories.map(category => {
            categoryArray.push(
                <Chip style={{marginRight: '5px'}} label={category.title} />
                )
        })
       
    }
    return (
        <div 
            style={divStyle} 
        >
            <Card style={{display: 'flex', width: '100%', justifyContent: 'flex-start'}}>
                <div style={imgDivStyle}>
                    <img style={imgStyle}src={picture} />
                </div>
                <div 
                    style={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', width: '60%', alignItems: 'center', margin: '1em'}}
                    onClick={() => {
                    dispatch(setLocationDetail(locationInfo))
                    handleClick()}}
                >                    
                    
                    <div style={textDivStyle}>
                        <p style={nameStyle}>{name}</p>
                        <p style={addressStyle}>{location}</p>                                        
                    </div>
                    <div style={{width: '100%'}}>
                        {categoryArray}
                    </div>
                    
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', width: '20%', alignItems: 'flex-end', margin: '1em'}}>
                    <Button style={{height: '2em'}} startIcon={<LibraryAddIcon/>} color="primary" onClick={() => dispatch(addDestinations(locationInfo))}>Add To Trip</Button>
                </div>

            </Card>
        </div>
    )
}