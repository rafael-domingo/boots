import React from 'react';
import LargeMap from '../components/LargeMap';
import SearchBox from '../components/SearchBox';
import SearchResults from '../components/SearchResults';
import { useSelector, useDispatch } from 'react-redux';
import Maps from '../components/Maps';
import { setCenter, setCityLocationArray, setDirections, setFitBounds, setSearchLocationArray, setTripLocationArray, setZoom } from '../redux/maps';

export default function SearchView() {
    const currenttripListState = useSelector(state => state.currentTrip);
    const [mapLocation, setMapLocation] = React.useState(currenttripListState.coordinates)
    const dispatch = useDispatch();

    dispatch(setCenter(mapLocation));
    dispatch(setZoom(12))
    dispatch(setFitBounds(true))
    dispatch(setDirections(false))
    React.useEffect(() => {
        dispatch(setSearchLocationArray({}))
    }, [0])
    const divStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        // position: 'absolute',
        height: '100%',
        width: '100%',
        top: '0',
        right: '0'
    }

    const mapDivStyle = {
        height: '100vh',
        width: '50%',       
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start' 
        // overflow: 'scroll'
    }


    const searchDivStyle = {
        width: '100%',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        overflow: 'scroll'

    }

    const handleResults = (results) => {
        var locArray = []
        results.map(business => {
            const latitude = business.coordinates.latitude;
            const longitude = business.coordinates.longitude;
            const location = {
                lat: latitude,
                lng: longitude
            }
            locArray.push(location)
        })
        console.log(locArray)
        dispatch(setSearchLocationArray(locArray));
    }
    return (
        <div style={divStyle}>
{/* 
            <div style={mapDivStyle}>
                <Maps />
            </div> */}
            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '100%'}}>
                <SearchBox handleResults={handleResults}/>
                <div style={searchDivStyle}>
                    <SearchResults handleResults={handleResults}/>

                </div>
            </div>
           

        </div>
    )
}