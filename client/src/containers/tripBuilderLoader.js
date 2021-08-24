import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setCity, setCoordinates, setDestinations, setTravelTime, setTripBuilder } from '../redux/currentTrip';
import { setTransportation } from '../redux/maps';
import { resetTripBuilder } from '../redux/tripBuilder';
import { setTripList, setView, addTripList } from '../redux/user';
import { Yelp } from '../util/Yelp';
export default function TripBuilderLoader() {
    const dispatch = useDispatch();
    const tripBuilderState = useSelector(state => state.tripBuilder);
    const currentTripListState = useSelector(state => state.curentTrip);

    dispatch(setName(tripBuilderState.selectedCity))
    dispatch(setCity(tripBuilderState.selectedCity))
    dispatch(setCoordinates(tripBuilderState.selectedCityLocation))    
    dispatch(setTripBuilder(tripBuilderState))
    if (tripBuilderState.autoBuild) {
        Yelp.buildTrip(tripBuilderState.selectedCityLocation, tripBuilderState.timeDay, tripBuilderState.activities)
        .then(response => {
            dispatch(setDestinations(response))
            dispatch(setTravelTime([]))
            // dispatch(addTripList(currentTripListState))
            dispatch(setView('Trip'))
        })
    } else {
        // dispatch(addTripList(currentTripListState))
        dispatch(setView('Trip'))

    }
        
    return (
        <div>
            Loading
        </div>
    )
}