import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCity, setAutoComplete, setSelectedCity, setSelectedCityLocation } from '../../redux/tripBuilder';
import { Maps } from '../../util/Maps';

export default function City({ sessionToken }) {
    const tripBuilderState = useSelector(state => state.tripBuilder)
    const dispatch = useDispatch()

    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

    const questionDivStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }
    
    const questionStyle = {
        width: '100%',
        color: 'rgb(103, 140, 203)',
        fontSize: '2em',
        textAlign: 'center'
    }

    const textBoxStyle = {
        width: '100%'
    }
    
    const resultsDivStyle = {
        color: 'black',
        width: '100%',
        margin: '2em'
    }

    const resultStyle = {
        width: '80%',
        height: '2em',
        border: '1px solid black',
        borderRadius: '20px',
        padding: '2em',
        margin: '1em'
    }

    const selectedResultStyle = {
        width: '80%',
        height: '2em',
        border: '1px solid black',
        borderRadius: '20px',
        padding: '2em',
        margin: '1em',
        backgroundColor: 'rgb(103, 140, 203)',
        color: 'white'
    }

    const handleSelected = (item) => {
        dispatch(setSelectedCity(item))
        Maps.placeDetails(item.place_id, sessionToken).then(data => {
            dispatch(setSelectedCityLocation(data.result.geometry.location))
        })
    }

    const handleInput = (e) => {
        dispatch(setCity(e.target.value))
        Maps.autoComplete(e.target.value, sessionToken).then(data => {
            dispatch(setAutoComplete(data.predictions))
        })
        dispatch(setSelectedCity({}))
    }
    return(
        <div style={divStyle}>
            <div style={questionDivStyle}>
                <p style={questionStyle}>What city would you like to visit?</p>
                <input style={textBoxStyle} onChange={e => handleInput(e)} type="text" name="city" value={tripBuilderState.city}></input>
            </div>
            <div style={resultsDivStyle}>
                {
                    tripBuilderState.autoComplete.map(item =>{
                        return  (
                        <div 
                            onClick={() => {
                                handleSelected(item)
                            }}
                            style={tripBuilderState.selectedCity.description === item.description ? selectedResultStyle : resultStyle}
                        >
                            {item.description}
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}