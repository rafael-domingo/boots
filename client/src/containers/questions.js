import React from 'react';

import { useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid'

import City from '../components/questions/City';
import Travel from '../components/questions/Travel';
import Proceed from '../components/questions/Proceed';
import Time from '../components/questions/Time';
import Activity from '../components/questions/Activity';
import TripBuilderLoader from './tripBuilderLoader';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
export default function Questions() {
    // STATE MANAGEMENT
    const [showSearch, setShowSearch] = React.useState(true);

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
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        height: '100vh',
        width: '100vw'
    }

    const questionsDivStyle = {
        padding: '2em',
        width: '70%'
    }

  
    const handleSearch = () => {
        setShowSearch(!showSearch)
    }

    if (!formComplete) {
        return (
            <div style={divStyle}>
                <Fab
                    color="primary"
                    aria-label="previous"
                    onClick={() => setState(state - 1)} 
                    style={state === 0 ? {display: 'none'} : null }
                >
                    <ArrowBackIcon />
                </Fab>
                {/* <img src={LeftArrow} onClick={() => setState(state - 1)} style={state === 0 ? {display: 'none'} : null }/> */}
                <div style={questionsDivStyle}>
                    {
                        view==='city' && <City sessionToken={sessionToken} showSearch={showSearch} handleSearch={handleSearch}/>
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
                <Fab 
                    color="primary" 
                    aria-label="next"
                    onClick={() => {
                        if (autoBuild === false || state + 1 == views.length) {
                            setFormComplete(true)
                        } else {
                            setState(state + 1)
                        }
                        
                        }
                    }
                >
                    <ArrowForwardIcon />
                </Fab>                   
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