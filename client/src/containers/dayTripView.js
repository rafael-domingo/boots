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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import BuildIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
export default function DayTripView() {
    const [search, setSearch] = React.useState(false);
    const [detail, setDetail] = React.useState(false);
    const [reorder, setReorder] = React.useState(false);
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
        fontSize: '3em',
        fontWeight: 'normal',
  
    }

    const listDivStyle = {
        overflowY: 'scroll',
        overflowX: 'hidden',
        height: '75%',
        width: '100%'
    }

    const backButtonStyle = {
        position: 'absolute',
        top: '5em',
        left: '3em'
    }

    const searchButtonStyle = {
        position: 'absolute',
        bottom: '5em',
        right: '3em'
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
                      <Fab
                        style={backButtonStyle}
                        color="primary"
                        aria-label="previous"
                        onClick={() => dispatch(setView('UserHome'))}                     
                        >
                            <ArrowBackIcon />
                        </Fab>
                    <div style={mapDivStyle}>
                        <Maps />

                    </div>
                    <div style={locationsDivStyle} onClick={() => handleClick()}>
                        <LocationDetail />
                        
                    </div>
                    <Fab
                        style={searchButtonStyle}
                        color="secondary"
                        aria-label="previous"
                        onClick={() => setSearch(true)}                     
                        >
                            <SearchIcon />
                        </Fab>
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
                      <Fab
                        style={backButtonStyle}
                        color="primary"
                        aria-label="previous"
                        onClick={() => dispatch(setView('UserHome'))}                     
                        >
                            <ArrowBackIcon />
                        </Fab>
                    <div style={mapDivStyle}>
                        <Maps />

                    </div>

                    <div style={locationsDivStyle}>

                    <h1 style={cityNameStyle}>{currentTripListState.name}</h1>
                    {/* <TripBuilderWidget /> */}
                    <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Button style={reorder ? {display: 'none'} : {marginRight: '1em'}} startIcon={<EditIcon/>} color="primary" onClick={() => setReorder(!reorder)}>Edit</Button>
                        <Button style={reorder ? {marginRight: '1em'} : {display: 'none'}} variant="contained" startIcon={<DeleteIcon/>} color="secondary" onClick={() => setReorder(!reorder)}>Delete This Trip</Button>                    
                        <Button style={reorder ? {marginRight: '1em'} : {display: 'none'}} variant="outlined" startIcon={<BuildIcon/>} color="primary" onClick={() => setReorder(!reorder)}>Trip Builder</Button>                    
                        <Button style={reorder ? {marginRight: '1em'} : {display: 'none'}} variant="contained" startIcon={<EditIcon/>} color="primary" onClick={() => setReorder(!reorder)}>Done</Button>

                    </div>
                  <div style={listDivStyle}>
                        <List locations={locations} handleClick={handleClick} travelTime={travelTime} reorderList={reorder}/>
                    </div>

                             
                    </div>
                    <Fab
                        style={searchButtonStyle}
                        color="secondary"
                        aria-label="previous"
                        onClick={() => setSearch(true)}                     
                        >
                            <SearchIcon />
                        </Fab>
                    <button onClick={() => setSearch(true)}>Search</button>
                    <button onClick={() => dispatch(updateTripList(currentTripListState))}>Update</button>
                    <button onClick={() => {
                        dispatch(addTripList(currentTripListState))
                        dispatch(resetTripBuilder())
                        }}>Add</button>
                    <button onClick={() => dispatch(setView('UserHome'))}>Back</button>

                </div>
            )
        } else {
            return (
                <div style={divStyle}>
                    <Fab
                        style={backButtonStyle}
                        color="primary"
                        aria-label="previous"
                        onClick={() => dispatch(setView('UserHome'))}                     
                        >
                            <ArrowBackIcon />
                        </Fab>
                    <div style={mapDivStyle}>
                        <Maps />
                    </div>
                    <div style={locationsDivStyle}>
                    <h1 style={cityNameStyle}>{currentTripListState.name}</h1>
                        
                    </div>
                    <Fab
                        style={searchButtonStyle}
                        color="secondary"
                        aria-label="previous"
                        onClick={() => setSearch(true)}                     
                        >
                            <SearchIcon />
                        </Fab>
                    <button onClick={() => setSearch(true)}>Search</button>
                    <button onClick={() => dispatch(updateTripList(currentTripListState))}>Update</button>
                    <button onClick={() => {
                        dispatch(addTripList(currentTripListState))
                        dispatch(resetTripBuilder())
                        }}>Add</button>
                    <button onClick={() => dispatch(setView('UserHome'))}>Back</button>

                  
                </div>
            )
        }
      
    }
    }
    