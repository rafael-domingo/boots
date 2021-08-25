import React from 'react';
import { useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
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
        width: '35%',
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
        width: '25%',
        height: '10em',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
    return (
        <div style={divStyle} onClick={() => {
            dispatch(setLocationDetail(locationInfo))
            handleClick()}
        }>
            <Card style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                <div style={imgDivStyle}>
                    <img style={imgStyle}src={picture} />
                </div>
                <div style={textDivStyle}>
                    <p style={nameStyle}>{name}</p>
                    <p style={addressStyle}>{location}</p>                
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', width: '20%', alignItems: 'flex-end', margin: '1em'}}>
                    <Button style={{height: '2em'}} startIcon={<LibraryAddIcon/>} color="primary" onClick={() => dispatch(addDestinations(locationInfo))}>Add To Trip</Button>
                </div>

            </Card>
        </div>
    )
}