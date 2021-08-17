import React from 'react';
import SmallMap from '../components/SmallMap';
import SearchView from './searchView';
import { useSelector, useDispatch } from 'react-redux';
import FlatMaps from '../components/FlatMaps';
import Maps from '../components/Maps';
import List from '../components/List';
import { addTripList, updateTripList } from '../redux/user';
import { setView } from '../redux/user';
import { resetTripBuilder } from '../redux/tripBuilder';
import LocationDetail from '../components/LocationDetail';
import { setCenter, setCityLocationArray, setDirections, setFitBounds, setSearchLocationArray, setTransportation, setTripLocationArray, setZoom } from '../redux/maps';
import { setDestinations } from '../redux/currentTrip';
import TripBuilderWidget from '../components/TripBuilderWidget';
export default function DayTripView() {
    const [search, setSearch] = React.useState(false);
    const [detail, setDetail] = React.useState(false);
    const locations = useSelector(state => state.currentTrip.destinations);
    const travelTime = useSelector(state => state.currentTrip.travelTime);
    const transportation = useSelector(state => state.currentTrip.tripBuilder.transportation)
    const currentTripListState = useSelector(state => state.currentTrip);
    const tripListState = useSelector(state => state.user.tripList);
    const [mapLocation, setMapLocation] = React.useState([currentTripListState.coordinates]);
    const dispatch = useDispatch();
    dispatch(setTripLocationArray(locations))
    dispatch(setCityLocationArray([]))
    dispatch(setDirections(true))
    dispatch(setSearchLocationArray({}))
    dispatch(setTransportation(transportation))
    dispatch(setZoom(12))
    dispatch(setFitBounds(true))
    const divStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'absolute',
        flexWrap: 'wrap',
        top: '0',
        right: '0',
        // flexWrap: 'wrap'
    }

    const mapDivStyle = {
        height: 'auto',
        width: '50%',        
        overflow: 'scroll'
    }

    const locationsDivStyle = {
        width: '50%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        overflowY: 'hidden',
        overflowX: 'hidden'

        
    }

    const cityNameStyle = {
        color: 'rgb(64, 112, 191)',
        fontSize: '5em',
        fontWeight: 'normal'

    }

    const listDivStyle = {
        overflowY: 'scroll',
        overflowX: 'hidden',
        height: '80%'
    }

    const handleClick = () => {
        setDetail(!detail);
    }
    
    const onDragEnd = (result) => {
        const arrayMod = Array.from(locations);
        const [reorderedItem] = arrayMod.splice(result.source.index, 1)
        arrayMod.splice(result.destination.index, 0, reorderedItem);        
        dispatch(setDestinations(arrayMod))
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
                    <div style={locationsDivStyle} onClick={() => handleClick()}>
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
        else if (locations.length > 0) {

            return (
                <div style={divStyle}>
                    <div style={mapDivStyle}>
                        <Maps />

                    </div>

                    <div style={locationsDivStyle}>

                    <h1 style={cityNameStyle}>{currentTripListState.name}</h1>
                    <TripBuilderWidget />
                    <div style={listDivStyle}>
                        <List locations={locations} handleClick={handleClick} travelTime={travelTime}/>
                    </div>

                             
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
    