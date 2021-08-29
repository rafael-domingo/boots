import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setSearchTerm, setSearchResults, setAutoCompleteResults, setAutoComplete } from '../redux/currentTrip';
import { setSearchLocationArray } from '../redux/maps';
import { Yelp } from '../util/Yelp';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SearchBox({ handleResults }) {
    const dispatch = useDispatch();
    const searchTerm = useSelector(state => state.currentTrip.searchTerm);
    const coordinates = useSelector(state => state.currentTrip.coordinates);
    const currentDestinations = useSelector(state => state.currentTrip.destinations);
    const autoCompleteResults = useSelector(state => state.currentTrip.autoCompleteResults);
    
    const divStyle = {
        position: 'relative',
        top: '0px',
        marginBottom: '10px',
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '50px',
        boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.5)',
        zIndex: '100'
    }

   

    const handleSubmit = (e, value) => {
        e.preventDefault()
        console.log('submitted')
        console.log(e.target.value)
        Yelp.search(searchTerm, coordinates).then(results => 
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

    const handleChange = (e) => {
        dispatch(setSearchTerm(e.target.value))
        dispatch(setSearchResults([]))
        dispatch(setSearchLocationArray([]))
        dispatch(setAutoCompleteResults([]))
        if (e.target.value.length > 2) {
            Yelp.autoComplete(e.target.value).then(results => {
                dispatch(setAutoCompleteResults(results.terms))
                dispatch(setAutoComplete(true))
            })
        }
        
       
    }

    return (
        <div style={divStyle}>
            <form style={{width: '95%', paddingBottom: '5px'}} onSubmit={handleSubmit}>              
                <Autocomplete
                    freeSolo
                    id="searchCity"
                    disableClearable                   
                    options={autoCompleteResults}                         
                    getOptionLabel={(option) => option.text}              
                    onChange={(event, newValue) => {
                        handleSubmit(event, newValue)
                    }}                    
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="What are you looking for?"                        
                        color="primary"                        
                        onChange={e => handleChange(e)} 
                        InputProps={{ ...params.InputProps, type: 'search', disableUnderline: true }}
                    />
                    )}
                />
            </form>
        </div>
        
    )
}