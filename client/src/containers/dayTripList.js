import React from 'react';
import TripCard from '../components/TripCard';
import { useSelector, useDispatch } from 'react-redux';
import { setView } from '../redux/user';
import { setName, setCity, setCoordinates, setDestinations, setTripBuilder, setTripId } from '../redux/currentTrip';
import Maps from '../components/Maps';
import { setCenter, setCityLocationArray, setDirections, setFitBounds, setTripLocationArray, setWindowWidth, setZoom } from '../redux/maps';
import { updateUser } from '../util/Firebase';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function DayTripList() {
    const tripListState = useSelector(state => state.user.tripList);
    const user = useSelector(state => state.user);
    updateUser(user.username, user.email, user.uid, tripListState)
    const dispatch = useDispatch();
    const windowWidth = window.innerWidth
    const divStyle = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        overflowY: 'scroll',

    }

    const tripCardStyle = {
        display: 'flex',
        marginTop: windowWidth < 400 ? '50%' : '0',       
        width: windowWidth < 400 ? '100%' : '50%',        
        justifyContent: windowWidth < 400 ? 'center' : 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
       
    }
  
    const cardStyle = {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',         
        width: windowWidth < 400 ? '125px' : '175px', 
        height: windowWidth < 400 ? '125px' : '175px', 
        borderRadius: '50%', 
        margin: windowWidth < 400 ? '0.5em' : '1em', 
        backgroundColor: 'rgba(64,112,191,1)', 
        boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.5)'
    }

    const handleHover = (location) => {
        console.log(location)
        dispatch(setCenter(location))
        dispatch(setZoom(12));
        dispatch(setFitBounds(false))
    }

    const handleHoverExit = (location) => {
        dispatch(setZoom(8));
        dispatch(setFitBounds(true))
    }

    const handleClick = (trip) => {
        dispatch(setName(trip.name))
        dispatch(setCity(trip.name))
        dispatch(setCoordinates(trip.location))
        dispatch(setDestinations(trip.trip))
        dispatch(setTripId(trip.tripId))
        dispatch(setView('Trip'))
        dispatch(setTripBuilder(trip.tripBuilder))
    }

    React.useEffect(() => {
        dispatch(setCityLocationArray(tripListState))
        dispatch(setTripLocationArray([]))
        dispatch(setWindowWidth(window.innerWidth))
        dispatch(setDirections(false))
    })

    return (
        <div style={divStyle}>                        
            <Maps />                        
            <div style={tripCardStyle}>
                <h1 style={{width: '100%'}}>Your Trips</h1>
                {
                    tripListState.map(trip => {
                        return (
                        <Card style={cardStyle}>
                            <TripCard 
                                handleHoverExit={handleHoverExit} 
                                handleHover={handleHover} 
                                handleClick={handleClick} 
                                tripDetails={trip}
                            />
                        </Card>
                        )
                    })
                }                                       
            </div>
            <Fab 
                color="secondary" 
                aria-label="add" 
                style={{position: 'absolute', bottom: '3em', right: '3em'}}
                onClick={() => dispatch(setView('Questions'))}
            >
                <AddIcon />
            </Fab>
        </div>
    )
}