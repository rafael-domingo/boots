import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setSearchTerm, setSearchResults } from '../redux/user';
import { Yelp } from '../util/Yelp';
export default function SearchBox() {
    const dispatch = useDispatch();
    const searchTerm = useSelector(state => state.user.searchTerm);
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
        Yelp.search(searchTerm).then(results => dispatch(setSearchResults(results)))
    }

    const handleChange = (e) => {
        dispatch(setSearchTerm(e.target.value))
        // Yelp.autoComplete(e.target.value)
    }
    return (
        <div style={divStyle}>
            <form onSubmit={handleSubmit}>
                <input style={textBoxStyle} onChange={handleChange} type="text" name="search"></input>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}