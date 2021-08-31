import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setCity, setCoordinates, setDestinations, setTravelTime, setTripBuilder, setTripId } from '../redux/currentTrip';
import { setView } from '../redux/user';
import { Yelp } from '../util/Yelp';
import CircularProgress from '@material-ui/core/CircularProgress';
import { v4 as uuidv4 } from 'uuid';

export default function TripBuilderLoader() {
    const dispatch = useDispatch();
    const tripBuilderState = useSelector(state => state.tripBuilder);
    const tripId = uuidv4();
    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh'
    }
    dispatch(setTripId(tripId))
    dispatch(setName(tripBuilderState.selectedCity))
    dispatch(setCity(tripBuilderState.selectedCity))
    dispatch(setCoordinates(tripBuilderState.selectedCityLocation))    
    dispatch(setTripBuilder(tripBuilderState))
    if (tripBuilderState.autoBuild) {
        Yelp.buildTrip(tripBuilderState.selectedCityLocation, tripBuilderState.timeDay, tripBuilderState.activities)
        .then(response => {
            dispatch(setDestinations(response))
            dispatch(setTravelTime([]))            
            dispatch(setView('Trip'))
        })
    } else {        
        dispatch(setDestinations([]))
        dispatch(setView('Trip'))


    }
        
    return (
        <div style={divStyle}>
            <CircularProgress />
        </div>
    )
}