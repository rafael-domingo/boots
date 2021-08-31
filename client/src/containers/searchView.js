import React from 'react';
import SearchBox from '../components/SearchBox';
import SearchResults from '../components/SearchResults';
import { useSelector, useDispatch } from 'react-redux';
import Maps from '../components/Maps';
import { setCenter, setDirections, setFitBounds, setSearchLocationArray, setZoom } from '../redux/maps';

export default function SearchView() {
    const currenttripListState = useSelector(state => state.currentTrip);
    const [detail, setDetail] = React.useState(false)    
    const windowWidth = window.innerWidth
    const dispatch = useDispatch();

    dispatch(setCenter(currenttripListState.coordinates));
    dispatch(setZoom(12))
    dispatch(setFitBounds(true))
    dispatch(setDirections(false))
    React.useEffect(() => {
        dispatch(setSearchLocationArray({}))
    })
    const handleClick = () => {        
        setDetail(!detail);
        // dispatch(setFitBounds(detail)) 
    }    

    
    const mapDivStyle = {
        height: windowWidth < 400 ? null : 'auto',
        width: windowWidth < 400 ? null : '50%',        
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
        width: windowWidth < 400 ? '100%' : '50%',
        height: windowWidth < 400 ? '65%' : '90%',
        // overflow: 'scroll',
        marginTop: windowWidth < 400 ? '50%' : '0',
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