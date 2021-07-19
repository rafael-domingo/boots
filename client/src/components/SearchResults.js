import React from 'react';
import LocationCard from './LocationCard';
import { useSelector, useDispatch } from 'react-redux';
export default function SearchResults() {

    const dispatch = useDispatch();
    const searchResults = useSelector(state => state.user.searchResults.businesses);
    console.log(searchResults)
    const divStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexWrap: 'wrap',
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
    } else {
        return (
            <div>
                Loading
            </div>
        )
    }
   
}