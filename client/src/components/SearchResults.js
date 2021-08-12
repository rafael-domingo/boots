import React from 'react';
import LocationCard from './LocationCard';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, setSearchResults, setAutoCompleteResults } from '../redux/currentTrip';
import { Yelp } from '../util/Yelp';

export default function SearchResults({ handleResults }) {

    const dispatch = useDispatch();
    const searchResults = useSelector(state => state.currentTrip.searchResults.businesses);
    const autoCompleteResults = useSelector(state => state.currentTrip.autoCompleteResults.terms);
    const autoComplete = useSelector(state => state.currentTrip.autoComplete);
    const coordinates = useSelector(state => state.currentTrip.coordinates);
    console.log(autoCompleteResults)
    
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
                dispatch(setSearchResults(results))
                handleResults(results)
            }
        )
    }
    if (searchResults !== undefined) {
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
                            />
                        )
                    })
                }
            </div>
        )
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