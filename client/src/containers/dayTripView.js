import React from 'react';
import SearchView from './searchView';
import { useSelector, useDispatch } from 'react-redux';
import Maps from '../components/Maps';
import { setCityLocation, setCityLocationArray, setDirections, setFitBounds, setSearchLocationArray, setTransportation, setTripLocationArray, setZoom } from '../redux/maps';
import { setAutoComplete, setAutoCompleteResults, setSearchResults, setSearchTerm } from '../redux/currentTrip';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import TripView from './tripView';

export default function DayTripView() {
    const [search, setSearch] = React.useState(false);
    const [detail, setDetail] = React.useState(false);   
    const currentTripListState = useSelector(state => state.currentTrip);

    const dispatch = useDispatch();
    React.useEffect(() => {
        console.log('useeffect')
        dispatch(setTripLocationArray(currentTripListState.destinations))
        dispatch(setCityLocationArray([]))        
        dispatch(setTransportation(currentTripListState.tripBuilder.transportation))
        dispatch(setZoom(12))
        dispatch(setFitBounds(true))
        dispatch(setCityLocation(currentTripListState.coordinates))
    }, [currentTripListState])

    const divStyle = {
        height: '90vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        // position: 'absolute',
        flexWrap: 'wrap',
        // top: '0',
        // right: '0',
        overflow: 'hidden'
        // flexWrap: 'wrap'
    }

    const mapDivStyle = {
        height: 'auto',
        width: '50%',        
        overflow: 'hidden'
    }

    const locationsDivStyle = {
        width: '50%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        overflowY: 'scroll',
        overflowX: 'hidden',
        flexDirection: 'column'
    }

    const searchButtonStyle = {
        position: 'absolute',
        bottom: '5em',
        right: '3em'
    }

    const handleClick = () => {
        setDetail(!detail);
    }    
  

    if (search) {
        dispatch(setDirections(false))
        return (
            <div style={divStyle}>
                <div style={mapDivStyle}>
                    <Maps handleClick={handleClick}/>
                </div>
                <div style={locationsDivStyle}>
                    <SearchView />               
                </div>                 
                <Fab
                    style={searchButtonStyle}
                    color="secondary"
                    aria-label="close"
                    onClick={() => {
                        setSearch(false)                  
                        dispatch(setSearchTerm(''))
                        dispatch(setSearchResults([]))
                        dispatch(setAutoCompleteResults([]))
                        dispatch(setAutoComplete(false))
                    }}
                    >
                        <CloseIcon />
                    </Fab>
            </div>
        )
    }
    
    else {
        dispatch(setSearchLocationArray({}))
        dispatch(setDirections(true))
        return (
            <div style={divStyle}>               
                <TripView />
                <Fab
                    style={searchButtonStyle}
                    color="secondary"
                    aria-label="previous"
                    onClick={() => setSearch(true)}                     
                    >
                        <SearchIcon />
                    </Fab>
                
            </div>
        )              
    }
    }
    