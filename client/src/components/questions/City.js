import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCity, setAutoComplete, setSelectedCity, setSelectedCityLocation } from '../../redux/tripBuilder';
import { Maps } from '../../util/Maps';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import EditIcon from '@material-ui/icons/Edit';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button'

export default function City({ sessionToken, showSearch, handleSearch }) {
    const tripBuilderState = useSelector(state => state.tripBuilder)
    const dispatch = useDispatch()

    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
       
    }

    const questionDivStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        minWidth: '250px',
        height: 'auto'
    }
    
    const questionStyle = {
        width: '100%',
        color: 'rgb(103, 140, 203)',
        fontSize: '2em',
        textAlign: 'center',
        height: 'auto'

    }

    const resultsDivStyle = {
        color: 'rgb(103, 140, 203)',
        minWidth: '350px',
        margin: '2em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        height: 'auto'
    }

    const buttonStyle = {
        backgroundColor: 'rgb(64,112,191)',
        color: 'white',
        margin: '20px'
      }

    const handleSelected = (item) => {
        dispatch(setSelectedCity(item.description))
        Maps.placeDetails(item.place_id, sessionToken).then(data => {
            dispatch(setSelectedCityLocation(data.result.geometry.location))
        })
        handleSearch()
    }

    const handleInput = (e) => {
        dispatch(setCity(e.target.value))
        Maps.autoComplete(e.target.value, sessionToken).then(data => {
            dispatch(setAutoComplete(data.predictions))
        })
        dispatch(setSelectedCity(''))
    }
    return(
        <div style={divStyle}>
           <div style={{width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', height: 'auto'}}>
            <p style={questionStyle}>What city would you like to visit?</p>

                <Autocomplete
                    freeSolo
                    id="searchCity"
                    disableClearable
                    style={showSearch ? questionDivStyle : {display: 'none'}}
                    options={tripBuilderState.autoComplete}                         
                    getOptionLabel={(option) => option.description}              
                    onChange={(event, newValue) => {
                        console.log(event)
                        handleSelected(newValue)
                    }}                    
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search city"
                        margin="normal"
                        variant="outlined"
                        color="primary"
                        onChange={e => handleInput(e)} 
                        InputProps={{ ...params.InputProps, type: 'search', startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon />
                            </InputAdornment>
                          ) }}
                    />
                    )}
                />
            <div style={showSearch ? {display: 'none'} : resultsDivStyle}>
                <h1 style={{width: '100%', textAlign: 'center'}}>{tripBuilderState.selectedCity}</h1>
                <Button style={buttonStyle} onClick={() => handleSearch()}>
                <EditIcon />
                Change Location
                </Button>                   
            </div>
            </div>
        </div>
    )
}