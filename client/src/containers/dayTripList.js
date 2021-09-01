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
    const mobile = useSelector(state => state.map.windowWidth)
    const divStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: mobile ? 'center' : 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        overflowY: 'hidden',

    }

    const tripCardStyle = {
        display: 'flex',
        marginTop: mobile ? '25vh' : '5vh',       
        width: mobile ? '100%' : '50%',  
        height: '100%',      
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'nowrap',        
        overflowY: 'hidden',
        overflowX: 'hidden',
        flexDirection: 'column'
       
    }
  
    const cardStyle = {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',         
        width: mobile ? '45vw' : '12vw', 
        height: mobile ? '150px' : '12vw', 
        borderRadius: mobile ? '0%' : '50%', 
        margin: mobile ? '0.5vw' : '1vw', 
        backgroundColor: 'rgba(64,112,191,1)', 
        boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.5)'
    }

    const listDivStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        overflowY: 'scroll',
        overflowX: 'hidden',
        height: mobile ? '65vh': '85vh',
        width: '95%'
    }

    const mapDivStyle = {
        height: mobile ? null : 'auto',
        width: mobile ? null : '50%',        
        overflow: 'hidden'
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
        dispatch(setCenter(trip.location))
    }

    React.useEffect(() => {
        dispatch(setCityLocationArray(tripListState))
        dispatch(setTripLocationArray([]))        
        dispatch(setDirections(false))
    })

    return (
        <div style={divStyle}>            
            <div style={mapDivStyle}>            
            <Maps />                 
            </div>       
            <div style={tripCardStyle}>
                <h1 style={{color: 'rgb(64, 112, 191)', width: '100%', height: '5vh'}}>Your Trips</h1>
                <div style={listDivStyle}>
                {
                    tripListState.map(trip => {
                        return (
                        <Card style={cardStyle} key={trip.tripId}>
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