import React from 'react';
import RightArrow from '../assets/right-arrow.png';
import LeftArrow from '../assets/left-arrow.png';

import { useDispatch, useSelector } from 'react-redux';
import { 
    setCity, 
    setTransportation, 
    setAutoBuild, 
    setTimeDay, 
    setActivities, 
    setAutoComplete, 
    setSelectedCityLocation, 
    setSelectedCityName } from '../redux/tripBuilder';

import {Maps} from '../util/Maps';
import { v4 as uuidv4 } from 'uuid'

import City from '../components/questions/City';
import Travel from '../components/questions/Travel';
import Proceed from '../components/questions/Proceed';
import Time from '../components/questions/Time';
import Activity from '../components/questions/Activity';

export default function Questions() {
  ////////////////////////////
    // STATE MANAGEMENT
    const tripBuilderState = useSelector(state => state.tripBuilder);
    // Handle which question to show based on flow
    var [state, setState] = React.useState(0);
    const views = ['city', 'travel', 'proceed', 'time', 'activity'];
    var view = views[state];
    const [formComplete, setFormComplete] = React.useState(false);
    const autoBuild = useSelector(state => state.tripBuilder.autoBuild)
    const dispatch = useDispatch();
    ////////////////////////////

    // Generate session token for Maps API call
    var sessionToken = uuidv4();
    
    ////////////////////////////
    // Event handlers for children functions
    const cityInput = (e) => {
        dispatch(setCity(e.target.value))
        Maps.autoComplete(e.target.value, sessionToken).then(data => {
            dispatch(setAutoComplete(data.predictions))
        })
        Maps.placeDetails("ChIJAYWNSLS4QIYROwVl894CDco", sessionToken)
    }
    const transportationInput = (transport) => {
        dispatch(setTransportation(transport))
    }
    const proceedInput = (autoBuild) => {
        dispatch(setAutoBuild(autoBuild))
    }
    const timeInput = (timeInput) => {
        dispatch(setTimeDay(timeInput))
    }
    const activityInput = (activityInput) => {
        dispatch(setActivities(activityInput))
    }
    ////////////////////////////

    ////////////////////////////
    // DIV STYLES
    const divStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    }

    const questionsDivStyle = {
        padding: '2em'
    }
    ////////////////////////////
    
    if (!formComplete) {
        return (
            <div style={divStyle}>
                <img src={LeftArrow} onClick={() => setState(state - 1)}/>
                <div style={questionsDivStyle}>
                    {
                        view==='city' && <City onChange={cityInput} tripBuilderState={tripBuilderState}/>
                    }
                    {
                        view==='travel' && <Travel transportation={transportationInput} tripBuilderState={tripBuilderState}/>
                    }
                    {
                        view==='proceed' && <Proceed proceedInput={proceedInput} tripBuilderState={tripBuilderState}/>
                    }
                    {
                        view==='time' && <Time timeInput={timeInput} tripBuilderState={tripBuilderState}/>
                    }
                    {
                        view==='activity' && <Activity activityInput={activityInput} tripBuilderState={tripBuilderState}/>
                    }               
                </div>     
                <img 
                    src={RightArrow} 
                    onClick={() => {
                        if (autoBuild === false || state + 1 == views.length) {
                            setFormComplete(true)
                        } else {
                            setState(state + 1)
                        }
                        
                        }
                    }
                />
            </div>
        )
    } else {
        return (
            <div>
                Submit
            </div>
        )
    }
   
}