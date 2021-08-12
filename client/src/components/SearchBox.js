import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setSearchTerm, setSearchResults, setAutoCompleteResults, setAutoComplete } from '../redux/currentTrip';
import { setSearchLocationArray } from '../redux/maps';
import { Yelp } from '../util/Yelp';
export default function SearchBox({ handleResults }) {
    const dispatch = useDispatch();
    const searchTerm = useSelector(state => state.currentTrip.searchTerm);
    const coordinates = useSelector(state => state.currentTrip.coordinates);
    const divStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }

    const textBoxStyle = {
        width: '59%',
        border: 'none',
        fontSize: '1.5em',
        height: '2em',
        borderRadius: '20px'

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submitted')
        console.log(e.target.value)
        Yelp.search(searchTerm, coordinates).then(results => 
            {
                dispatch(setSearchResults(results))
                handleResults(results)
            }
        )
        
    }

    const handleChange = (e) => {
        dispatch(setSearchTerm(e.target.value))
       
        if (e.target.value.length > 2) {
            Yelp.autoComplete(e.target.value).then(results => {
                dispatch(setAutoCompleteResults(results))
                dispatch(setAutoComplete(true))
            })
        }
       
    }

    const onKeyDown = (e) => {
        if (e.keyCode == 8) {
            dispatch(setSearchResults({}))
            dispatch(setSearchLocationArray({}))
        }
    }
    return (
        <div style={divStyle}>
            <form onSubmit={handleSubmit}>
                <input style={textBoxStyle} onChange={handleChange} type="text" name="search" onKeyDown={onKeyDown}></input>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}