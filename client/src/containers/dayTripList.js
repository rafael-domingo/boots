import React from 'react';
import LargeMap from '../components/LargeMap';
import TripCard from '../components/TripCard';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTrip } from '../redux/user';
import FlatMaps from '../components/FlatMaps';

export default function DayTripList() {
    const tripListState = useSelector(state => state.user.tripList);
    const [mapLocation, setMapLocation] = React.useState([tripListState[0].location, tripListState[2].location]);
    const dispatch = useDispatch();

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
    const handleHover = (location) => {
        console.log(location)
        setMapLocation([location])
    }

    const handleClick = (trip) => {
        dispatch(setCurrentTrip(trip))
    }
    return (
        <div style={divStyle}>
            <FlatMaps location={mapLocation}/>
            <div style={tripCardStyle}>
                {
                    tripListState.map(trip => {
                        return (<TripCard handleHover={handleHover} handleClick={handleClick} tripDetails={trip}/>)
                    })
                }
               
                
            </div>
        </div>
    )
}