import React from 'react';
import LargeMap from '../components/LargeMap';
import TripCard from '../components/TripCard';
import { useSelector } from 'react-redux';

export default function DayTripList() {
    const tripListState = useSelector(state => state.user.tripList);
    const [mapLocation, setMapLocation] = React.useState(tripListState[0].location);

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
    const handleClick = (location) => {
        console.log(location)
        setMapLocation(location)
    }
    return (
        <div style={divStyle}>
            <LargeMap location={mapLocation}/>
            <div style={tripCardStyle}>
                {
                    tripListState.map(trip => {
                        return (<TripCard handleClick={handleClick} tripDetails={trip}/>)
                    })
                }
               
                
            </div>
        </div>
    )
}