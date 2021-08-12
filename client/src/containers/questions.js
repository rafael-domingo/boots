import React from 'react';
import RightArrow from '../assets/right-arrow.png';
import LeftArrow from '../assets/left-arrow.png';

import { useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid'

import City from '../components/questions/City';
import Travel from '../components/questions/Travel';
import Proceed from '../components/questions/Proceed';
import Time from '../components/questions/Time';
import Activity from '../components/questions/Activity';
import TripBuilderLoader from './tripBuilderLoader';

export default function Questions() {
    // STATE MANAGEMENT
    // Handle which question to show based on flow
    var [state, setState] = React.useState(0);
    const views = ['city', 'travel', 'proceed', 'time', 'activity'];
    var view = views[state];
    const [formComplete, setFormComplete] = React.useState(false);
    const autoBuild = useSelector(state => state.tripBuilder.autoBuild)
    
    // Generate session token for Maps API call
    var sessionToken = uuidv4();

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

  
    if (!formComplete) {
        return (
            <div style={divStyle}>
                <img src={LeftArrow} onClick={() => setState(state - 1)} style={state === 0 ? {display: 'none'} : null }/>
                <div style={questionsDivStyle}>
                    {
                        view==='city' && <City sessionToken={sessionToken}/>
                    }
                    {
                        view==='travel' && <Travel />
                    }
                    {
                        view==='proceed' && <Proceed />
                    }
                    {
                        view==='time' && <Time />
                    }
                    {
                        view==='activity' && <Activity />
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
                <TripBuilderLoader />
            </div>
        )
    }
   
}