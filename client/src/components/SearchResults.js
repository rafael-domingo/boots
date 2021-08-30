import React from 'react';
import LocationCard from './LocationCard';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, setSearchResults, setAutoCompleteResults } from '../redux/currentTrip';
import { Yelp } from '../util/Yelp';
import LocationDetail from './LocationDetail';
import { setFitBounds, setSearchLocationArray, setZoom } from '../redux/maps';
import SearchCard from './SearchCard';

export default function SearchResults({ handleResults, detail, setDetail }) {
    const dispatch = useDispatch();
    const searchResults = useSelector(state => state.currentTrip.searchResults);  
    const coordinates = useSelector(state => state.currentTrip.coordinates);
    const currentDestinations = useSelector(state => state.currentTrip.destinations);
    
    dispatch(setZoom(12))
    dispatch(setFitBounds(true))
    const divStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    }

    const handleClick = () => {
        setDetail(!detail)
    }
    if (searchResults.length > 0) {
        if (detail) {
            return (
                <div style={divStyle} onClick={() => handleClick()}>
                    <LocationDetail handleClick={handleClick}/>
                </div>
            )
        
        } else {
            return (
                <div style={divStyle}>
                    {
                        searchResults.map(item => {
                            return (
                                <SearchCard 
                                    name={item.name} 
                                    picture={item.image_url} 
                                    location={item.location.address1} 
                                    locationInfo={item}
                                    handleClick={handleClick}
                                />
                            )
                        })
                    }
                </div>
            )
        }
      
    } 
     else {
        return (
            <div>
                Loading
            </div>
        )
    }
   
}