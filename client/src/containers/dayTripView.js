import React from 'react';
import LocationCard from '../components/LocationCard';
import SmallMap from '../components/SmallMap';
import SearchView from './searchView';
import { useSelector, useDispatch } from 'react-redux';
import FlatMaps from '../components/FlatMaps';
import Maps from '../components/Maps';
import { addTripList, updateTripList } from '../redux/user';
import { setView } from '../redux/user';
import { resetTripBuilder } from '../redux/tripBuilder';
import LocationDetail from '../components/LocationDetail';
import { setCityLocationArray, setDirections, setSearchLocationArray, setTripLocationArray } from '../redux/maps';

export default function DayTripView() {
    const [search, setSearch] = React.useState(false);
    const [detail, setDetail] = React.useState(false);
    const locations = useSelector(state => state.currentTrip.destinations);
    const travelTime = useSelector(state => state.currentTrip.travelTime);
    const currentTripListState = useSelector(state => state.currentTrip);
    const tripListState = useSelector(state => state.user.tripList);
    const [mapLocation, setMapLocation] = React.useState([currentTripListState.coordinates]);
    const dispatch = useDispatch();
    dispatch(setTripLocationArray(locations))
    dispatch(setCityLocationArray([]))
    dispatch(setDirections(true))
    dispatch(setSearchLocationArray({}))
    const divStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'absolute',
        flexWrap: 'wrap',
        top: '0',
        right: '0'
        // flexWrap: 'wrap'
    }

    const mapDivStyle = {
        height: 'auto',
        width: '50%',        
        overflow: 'scroll'
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

    const handleClick = () => {
        setDetail(true);
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
        if (detail) {
            return (
                <div style={divStyle}>
                    <div style={mapDivStyle}>
                        <Maps />

                    </div>
                    <div style={locationsDivStyle}>
                    <LocationDetail />
                        
                    </div>
                    <button onClick={() => setSearch(true)}>Search</button>
                    <button onClick={() => dispatch(updateTripList(currentTripListState))}>Update</button>
                    <button onClick={() => {
                        dispatch(addTripList(currentTripListState))
                        dispatch(resetTripBuilder())
                        }}>Add</button>
                    <button onClick={() => setDetail(false)}>Back</button>
                </div>
            )
        }
        else if (locations.length > 0 && travelTime.length > 0) {

            return (
                <div style={divStyle}>
                    <div style={mapDivStyle}>
                        <Maps />

                    </div>
                    <div style={locationsDivStyle}>
                        <h1 style={cityNameStyle}>{currentTripListState.name}</h1>
                        {
                            locations.map((item, i) => {
                                console.log(i)
                                if (i < travelTime.length) {
                                    var distance = travelTime[i].distance
                                    var time = travelTime[i].duration
                                } else {
                                    var distance = ''
                                    var time = ''
                                }
                                console.log(travelTime[i])
                                return (
                                    <div>
                                        <LocationCard 
                                            name={item.name} 
                                            picture={item.image_url} 
                                            location={item.location.address1} 
                                            locationInfo={item}
                                            handleClick={handleClick}
                                        />
                                        {distance}
                                        {time}
                                    </div>
                                )
                            })
                        }                     
                    </div>
                    <button onClick={() => setSearch(true)}>Search</button>
                    <button onClick={() => dispatch(updateTripList(currentTripListState))}>Update</button>
                    <button onClick={() => {
                        dispatch(addTripList(currentTripListState))
                        dispatch(resetTripBuilder())
                        }}>Add</button>
                    <button onClick={() => dispatch(setView('Home'))}>Back</button>

                </div>
            )
        } else {
            return (
                <div style={divStyle}>
                    <div style={mapDivStyle}>
                        <Maps />
                    </div>
                    <div style={locationsDivStyle}>
                    <h1 style={cityNameStyle}>{currentTripListState.name}</h1>
                        
                    </div>
                    <button onClick={() => setSearch(true)}>Search</button>
                    <button onClick={() => dispatch(updateTripList(currentTripListState))}>Update</button>
                    <button onClick={() => {
                        dispatch(addTripList(currentTripListState))
                        dispatch(resetTripBuilder())
                        }}>Add</button>
                    <button onClick={() => dispatch(setView('Home'))}>Back</button>

                  
                </div>
            )
        }
      
    }
    }
    