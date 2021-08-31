import React from 'react';
import SearchBox from '../components/SearchBox';
import SearchResults from '../components/SearchResults';
import { useSelector, useDispatch } from 'react-redux';
import Maps from '../components/Maps';
import { setCenter, setDirections, setFitBounds, setSearchLocationArray, setZoom } from '../redux/maps';

export default function SearchView() {
    const currenttripListState = useSelector(state => state.currentTrip);
    const [mapLocation, setMapLocation] = React.useState(currenttripListState.coordinates)
    const [detail, setDetail] = React.useState(false)    
    const dispatch = useDispatch();

    dispatch(setCenter(mapLocation));
    dispatch(setZoom(12))
    dispatch(setFitBounds(true))
    dispatch(setDirections(false))
    React.useEffect(() => {
        dispatch(setSearchLocationArray({}))
    }, [0])
    const handleClick = () => {        
        setDetail(!detail);
        // dispatch(setFitBounds(detail)) 
    }    

    const mapDivStyle = {
        height: 'auto',
        width: '50%',       
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start' 
        // overflow: 'scroll'
    }


    const searchDivStyle = {
        width: '100%',
        height: '85vh',
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
        dispatch(setSearchLocationArray(results));
    }
    return (
        <>
            <div style={mapDivStyle}>
                <Maps handleClick={handleClick}/>
            </div>
            
            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '50%'}}>                
                <SearchBox handleResults={handleResults}/>
                    <div style={searchDivStyle}>
                        <SearchResults handleResults={handleResults} detail={detail} setDetail={setDetail}/>
                    </div>                    
            </div>           
        </>
    )
}