import React from 'react';
import LargeMap from '../components/LargeMap';
import TripCard from '../components/TripCard';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setUid, setUserName, setView } from '../redux/user';
import { setName, setCity, setCoordinates, setDestinations, setTripBuilder } from '../redux/currentTrip';
import FlatMaps from '../components/FlatMaps';
import Maps from '../components/Maps';
import { setCenter, setCityLocationArray, setDirections, setFitBounds, setTripLocationArray, setWindowWidth, setZoom } from '../redux/maps';
import { signInWithGoogle, signOut, auth, updateUser, deleteUser, signInWithPhone } from '../util/Firebase';
import Account from '../components/Account';

export default function DayTripList() {
    const tripListState = useSelector(state => state.user.tripList);
    // const user = useSelector(state => state.user);
    const [mapLocation, setMapLocation] = React.useState([tripListState[0].location, tripListState[1].location, tripListState[2].location]);
    const dispatch = useDispatch();
    const captchaRef = React.useRef(null);

    const divStyle = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexWrap: 'wrap',

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
        height: '50%',
        width: '75%',        
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        position: 'absolute',
        marginRight: '5vw'
    }
    const mapDivStyle = {
        height: 'auto',
        width: '100%',        
        overflow: 'scroll'
    }

    const newTripButtonStyle = {
        width: '3em',
        height: '3em',
        borderRadius: '50%',
        backgroundColor: 'rgba(64,112,191,1)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
                {
                    tripListState.map(trip => {
                        return (<TripCard handleHoverExit={handleHoverExit} handleHover={handleHover} handleClick={handleClick} tripDetails={trip}/>)
                    })
                }
                <div style={{width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => dispatch(setView('Questions'))}>
                    <div style={newTripButtonStyle}>
                    +
                    </div>
                </div>
            
                <button onClick={() => signInWithGoogle().then(result => {
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
            </div>
        </div>
    )
}