import React from 'react';
import LocationCard from '../components/LocationCard';
import SmallMap from '../components/SmallMap';
import SearchView from './searchView';
import { useSelector } from 'react-redux';
import FlatMaps from '../components/FlatMaps';

export default function DayTripView() {
    const [search, setSearch] = React.useState(false);
    const locations = useSelector(state => state.user.currentTrip);
    const tripListState = useSelector(state => state.user.tripList);
    const [mapLocation, setMapLocation] = React.useState(tripListState[0].location);
    const divStyle = {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'absolute',
        top: '0',
        right: '0'
        // flexWrap: 'wrap'
    }

    const mapDivStyle = {
        height: 'auto',
        width: '50%'
    }

    const locationsDivStyle = {
        width: '50%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
        
    }

    const cityNameStyle = {
        color: 'rgb(64, 112, 191)',
        fontSize: '5em',
        fontWeight: 'normal'

    }
    if (search) {
        return (
            <div style={divStyle}>
                <SearchView />
                <button onClick={() => setSearch(false)}>Trip View</button>
            </div>
        )
    }
    else {
        if (locations.length > 0) {
            return (
                <div style={divStyle}>
                    <div style={mapDivStyle}>
                        <FlatMaps location={mapLocation}/>

                    </div>
                    <div style={locationsDivStyle}>
                        <h1 style={cityNameStyle}>Baton Rouge</h1>
                        {
                            locations.map(item => {
                                return (
                                    <LocationCard 
                                        name={item.locationInfo.name} 
                                        picture={item.locationInfo.image_url} 
                                        location={item.locationInfo.location.address1} 
                                        locationInfo={item.locationInfo}
                                    />
                                )
                            })
                        }                     
                    </div>
                    <button onClick={() => setSearch(true)}>Search</button>
                </div>
            )
        } else {
            return (
                <div style={divStyle}>
                    <div style={mapDivStyle}>
                        <FlatMaps location={mapLocation}/>
                    </div>
                    <div style={locationsDivStyle}>
                        <h1 style={cityNameStyle}>Baton Rouge</h1>
                        
                    </div>
                    <button onClick={() => setSearch(true)}>Search</button>
                </div>
            )
        }
      
    }
    }
    