import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeDestinations } from '../redux/currentTrip';
import { setLocationDetail } from '../redux/user';
import Chip from '@material-ui/core/Chip';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import ReorderIcon from '@material-ui/icons/Reorder';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function LocationCard({ name, picture, location, locationInfo, handleClick, time, distance, reorder }) {
    const dispatch = useDispatch();
    const currentTripListState = useSelector(state => state.currentTrip);   
    const divStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: '10px',
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

    const buttonDivStyle = {
        width: '25%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
    return (
        <div style={divStyle} onClick={() => {
            if (!reorder) {
                dispatch(setLocationDetail(locationInfo))
                handleClick()
            }
            
            }}
        >
            <div style={imgDivStyle}>
                <img style={imgStyle}src={picture} />
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '75%'}}>
                <div style={textDivStyle}>
                    <p style={nameStyle}>{name}</p>
                    <p style={addressStyle}>{location}</p>                
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', width: '30%'}}>
                    {
                        !reorder && (
                            <div>
                            <Chip 
                            label={time} 
                            style={currentTripListState.tripBuilder.transportation === 'DRIVING' ? null : {display: 'none'}}
                            icon={<DirectionsCarIcon/>}
                            variant="outlined"
                            />
                            <Chip 
                            label={time} 
                            style={currentTripListState.tripBuilder.transportation === 'BICYCLING' ? null : {display: 'none'}}
                            icon={<DirectionsBikeIcon/>}
                            variant="outlined"
                            />
                            <Chip 
                            label={time} 
                            style={currentTripListState.tripBuilder.transportation === 'WALKING' ? null : {display: 'none'}}
                            icon={<DirectionsWalkIcon/>}
                            variant="outlined"
                            />
                            </div>
                        )
                    }                
                    {
                        reorder && (
                            <div>
                                <IconButton aria-label="reorder">
                                    <ReorderIcon/>
                                </IconButton>
                                <IconButton color="secondary" aria-label="delete" onClick={() => dispatch(removeDestinations(locationInfo))}>
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                        )
                    }
                </div>
            </div>                                            
        </div>
    )
}