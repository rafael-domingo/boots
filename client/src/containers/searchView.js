import React from 'react';
import SearchBox from '../components/SearchBox';
import SearchResults from '../components/SearchResults';
import { useSelector, useDispatch } from 'react-redux';
import Maps from '../components/Maps';
import { setCenter, setDirections, setFitBounds, setSearchLocationArray, setZoom } from '../redux/maps';

export default function SearchView() {
    const currenttripListState = useSelector(state => state.currentTrip);
    const [detail, setDetail] = React.useState(false)    
    const mobile = useSelector(state => state.map.windowWidth)
    const dispatch = useDispatch();

    dispatch(setCenter(currenttripListState.coordinates));
    dispatch(setZoom(12))
    dispatch(setFitBounds(true))
    dispatch(setDirections(false))

    const handleClick = () => {        
        setDetail(!detail);
        // dispatch(setFitBounds(detail)) 
    }    

    
    const mapDivStyle = {
        height: mobile ? null : 'auto',
        width: mobile ? null : '50%',        
        overflow: 'hidden'
    }


    const searchDivStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        overflowY: 'scroll',
        overflowX: 'hidden'

    }

    const outerSearchDivStyle = {
        display: 'flex', 
        justifyContent: 'center', 
        flexWrap: 'wrap', 
        width: mobile ? '100%' : '50%',
        height: mobile ? '65%' : '85%',
        // overflow: 'scroll',
        marginTop: mobile ? '22vh' : '5vh',
    }

    const handleResults = (results) => {
        var locArray = []
        results.forEach(business => {
            const latitude = business.coordinates.latitude;
            const longitude = business.coordinates.longitude;
            const location = {
                lat: latitude,
                lng: longitude
            }
            locArray.push(location)
        })
        
        dispatch(setSearchLocationArray(results));
    }
    return (
        <div style={{display: 'flex', width: '100%', height: '100vh'}}>            
            <div style={mapDivStyle}>
                <Maps handleClick={handleClick}/>
            </div>
            
            <div style={outerSearchDivStyle}>                
                <SearchBox handleResults={handleResults}/>
                    <div style={searchDivStyle}>
                        <SearchResults handleResults={handleResults} detail={detail} setDetail={setDetail}/>
                    </div>                    
            </div>           
        </div>
    )
}