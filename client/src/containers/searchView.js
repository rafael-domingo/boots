import React from 'react';
import LargeMap from '../components/LargeMap';
import SearchBox from '../components/SearchBox';
import SearchResults from '../components/SearchResults';
import { useSelector } from 'react-redux';
import FlatMaps from '../components/FlatMaps';

export default function SearchView() {
    const tripListState = useSelector(state => state.user.tripList);
    const [mapLocation, setMapLocation] = React.useState([tripListState[0].location, tripListState[1].location]);

    const divStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        height: '100vh',
        width: '100%'
    }

    const searchDivStyle = {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        margin: '2em',
        height: '90vh',
        overflow: 'scroll'
    }
    return (
        <div style={divStyle}>
            <FlatMaps location={mapLocation}/>
            <div style={searchDivStyle}>
                <SearchResults />
                <SearchBox />
            </div>
        
        </div>
    )
}