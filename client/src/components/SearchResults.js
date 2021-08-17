import React from 'react';
import LocationCard from './LocationCard';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, setSearchResults, setAutoCompleteResults } from '../redux/currentTrip';
import { Yelp } from '../util/Yelp';
import LocationDetail from './LocationDetail';
import { setFitBounds, setSearchLocationArray, setZoom } from '../redux/maps';

export default function SearchResults({ handleResults }) {
    const [detail, setDetail] = React.useState(false);
    const dispatch = useDispatch();
    const searchResults = useSelector(state => state.currentTrip.searchResults);
    const autoCompleteResults = useSelector(state => state.currentTrip.autoCompleteResults.terms);
    const autoComplete = useSelector(state => state.currentTrip.autoComplete);
    const coordinates = useSelector(state => state.currentTrip.coordinates);
    const currentDestinations = useSelector(state => state.currentTrip.destinations);
    console.log(autoCompleteResults)
    dispatch(setZoom(12))
    dispatch(setFitBounds(true))
    const divStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexWrap: 'wrap',
    }

    const resultStyle = {
        width: '80%',
        height: '2em',
        border: '1px solid black',
        borderRadius: '20px',
        padding: '2em',
        margin: '1em'
    }
    const handleSelection = (item) => {
        Yelp.search(item.text, coordinates).then(results => 
            {
                var resultsArray = [];
                var destinationsArray = [];
                currentDestinations.map(item => {
                    destinationsArray.push(item.id)
                })
                // filter out results that are already in trip
                results.businesses.map(resultItem => {
                    if (destinationsArray.includes(resultItem.id)) {
                        return
                    } else {
                        resultsArray.push(resultItem)                    
                    }
                })
                dispatch(setSearchResults(resultsArray))
                handleResults(resultsArray)
            }
        )
    }

    const handleClick = () => {
        setDetail(!detail)
        // dispatch(setSearchLocationArray({}))
    }
    if (searchResults.length > 0) {
        if (detail) {
            return (
                <div style={divStyle} onClick={() => handleClick()}>
                    <LocationDetail />
                </div>
            )
        
        } else {
            return (
                <div style={divStyle}>
                    {
                        searchResults.map(item => {
                            return (
                                <LocationCard 
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
      
    } else if (autoCompleteResults !== undefined) {
        return (
            <div style={divStyle}>
                {
                    autoCompleteResults.map(item => {
                        return  (
                            <div
                                style={resultStyle}
                                onClick={() => {
                                    handleSelection(item)
                                }}
                            >
                                {item.text}
                            </div>
                        )
                    })
                }
            </div>
        )
    } else {
        return (
            <div>
                Loading
            </div>
        )
    }
   
}