import React from 'react';
import LargeMap from '../components/LargeMap';
import SearchBox from '../components/SearchBox';
import SearchResults from '../components/SearchResults';
import { useSelector } from 'react-redux';
import Maps from '../components/Maps';

export default function SearchView() {
    const currenttripListState = useSelector(state => state.currentTrip);
    const [mapLocation, setMapLocation] = React.useState([currenttripListState.coordinates])

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
        height: 'auto',
        width: '50%',        
        overflow: 'scroll'
    }


    const searchDivStyle = {
        width: '50%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        overflow: 'scroll'

    }

    const handleResults = (results) => {
        var locArray = []
        results.businesses.map(business => {
            const latitude = business.coordinates.latitude;
            const longitude = business.coordinates.longitude;
            const location = {
                lat: latitude,
                lng: longitude
            }
            locArray.push(location)
        })
        setMapLocation(locArray);
        console.log(locArray)
    }
    return (
        <div style={divStyle}>
            <div style={mapDivStyle}>
                <Maps location={mapLocation} width={window.innerWidth}/>
            </div>
            <div style={searchDivStyle}>
                <SearchResults />
                <SearchBox handleResults={handleResults}/>
            </div>
        
        </div>
    )
}