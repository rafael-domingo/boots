import React from 'react';
import LargeMap from '../components/LargeMap';
import TripCard from '../components/TripCard';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setTripList, setUid, setUserName, setView } from '../redux/user';
import { setName, setCity, setCoordinates, setDestinations, setTripBuilder } from '../redux/currentTrip';
import FlatMaps from '../components/FlatMaps';
import Maps from '../components/Maps';
import { setCenter, setCityLocationArray, setDirections, setFitBounds, setTripLocationArray, setWindowWidth, setZoom } from '../redux/maps';
import { signInWithGoogle, signOut, auth, updateUser, deleteUser, signInWithPhone, getUser } from '../util/Firebase';
import Account from '../components/Account';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function DayTripList() {
    const tripListState = useSelector(state => state.user.tripList);
    const user = useSelector(state => state.user);
    updateUser(user.username, user.email, user.uid, tripListState)
    // const user = useSelector(state => state.user);
    
    const dispatch = useDispatch();
    const captchaRef = React.useRef(null);

    const divStyle = {
        height: '90vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        overflowY: 'scroll',

    }
    const cityDivStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'rgba(64, 112, 191, 0.6)'
    }
    const tripCardStyle = {
        display: 'flex',
        // marginTop: '100px',
        // height: '90vh',
        width: '50%',        
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        
        // position: 'absolute',        
    }
    const mapDivStyle = {
        height: 'auto',
        width: '100%',        
        overflow: 'scroll'
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
        dispatch(setView('Trip'))
        dispatch(setTripBuilder(trip.tripBuilder))
    }
    dispatch(setCityLocationArray(tripListState))
    dispatch(setTripLocationArray([]))
    dispatch(setWindowWidth(window.innerWidth))
    dispatch(setDirections(false))
 
   var userName = '';
   var email = '';
   var uid = '';
 
    return (
        <div style={divStyle}>
            
            {/* <div style={mapDivStyle}> */}
                <Maps />
            {/* </div> */}
            
            <div style={tripCardStyle}>
                <h1 style={{width: '100%'}}>Your Trips</h1>
                {
                    tripListState.map(trip => {
                        return (
                        <Card style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '175px', height: '175px', borderRadius: '50%', margin: '1em', backgroundColor: 'rgba(64,112,191,1)', boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.5)'}}>
                            <TripCard handleHoverExit={handleHoverExit} handleHover={handleHover} handleClick={handleClick} tripDetails={trip}/>
                        </Card>
                        )
                    })
                }                           
                {/* <button onClick={() => signInWithGoogle().then(result => {
                    console.log(result)
                    dispatch(setUserName(result.user.displayName))
                    dispatch(setEmail(result.user.email))
                    dispatch(setUid(result.user.uid))
                    userName = result.user.displayName
                    email = result.user.email
                    uid = result.user.uid
                })}>Sign In</button>
            <button onClick={() => signOut().then((result) => {
                console.log(result)
                if (result === undefined) {
                    dispatch(setUserName(''))
                    dispatch(setEmail(''))
                    dispatch(setUid(''))
                } else {
                    console.log('Sign out Error')
                }
             
            })}>Sign Out</button>
            <button onClick={() => updateUser(userName, email, uid, tripListState)}>Firestore</button>
            <button onClick={() => deleteUser()}>Delete User</button>
           
            <Account />
             */}
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