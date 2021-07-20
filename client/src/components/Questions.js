import React from 'react';
import RightArrow from '../assets/right-arrow.png';
import LeftArrow from '../assets/left-arrow.png';
import Bicycle from '../assets/bicycle.png';
import Car from '../assets/car.png';
import Walk from '../assets/walk.png';
import Sunrise from '../assets/sunrise.png';
import Sunset from '../assets/sunset.png';
import Midday from '../assets/midday.png';
import Eat from '../assets/eat.png';
import Shop from '../assets/shop.png';
import Caffeinate from '../assets/caffeinate.png';
import Sightsee from '../assets/sightsee.png';
import Drink from '../assets/drink.png';

import { useDispatch, useSelector } from 'react-redux';
import { setCity, setTransportation, setAutoBuild, setTimeDay, setActivities, tripBuilderSlice } from '../redux/tripBuilder';

export default function Questions() {
    const tripBuilderState = useSelector(state => state.tripBuilder);
    // Handle which question to show based on flow
    var [state, setState] = React.useState(0);
    const views = ['city', 'travel', 'proceed', 'time', 'activity'];
    var view = views[state];
    
    const [formComplete, setFormComplete] = React.useState(false);

    const dispatch = useDispatch();
    const autoBuild = useSelector(state => state.tripBuilder.autoBuild)
    // Event handlers for children functions
    const cityInput = (e) => {
        dispatch(setCity(e.target.value))
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

function City({ onChange, tripBuilderState }) {
    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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

    return(
        <div style={divStyle}>
            <div style={questionDivStyle}>
                <p style={questionStyle}>What city would you like to visit?</p>
                <input style={textBoxStyle} onChange={onChange} type="text" name="city" value={tripBuilderState.city}></input>
            </div>
        </div>
    )
}


function Travel({ transportation, tripBuilderState }) {
    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const questionDivStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }
    const questionStyle = {
        width: '100%',
        fontSize: '2em',
        color: 'rgb(103, 140, 203)',
        textAlign: 'center'
    }
    const choicesDivStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
    const selectedStyle = {
        backgroundColor: 'black'
    }
    return(
        <div style={divStyle}>
            <div style={questionDivStyle}>
                <p style={questionStyle}>How will you be traveling?</p>
                <div style={choicesDivStyle}>
                    <img 
                        style={ tripBuilderState.transportation == 'Car' ? selectedStyle : null } 
                        src={Car} 
                        onClick={() => {
                            transportation('Car')}
                            }
                    />
                    <img 
                        style={ tripBuilderState.transportation == 'Bicycle' ? selectedStyle : null } 
                        src={Bicycle} 
                        onClick={() => {
                            transportation('Bicycle')}
                            }
                    />
                     <img 
                        style={ tripBuilderState.transportation == 'Walk' ? selectedStyle : null } 
                        src={Walk} 
                        onClick={() => {
                            transportation('Walk')}
                            }
                    />
                </div>
            </div>
        </div>
        
    )
}

function Proceed({ proceedInput, tripBuilderState }) {
    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const questionDivStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

    const questionStyle = {
        width: '100%',
        fontSize: '2em',
        color: 'rgb(103, 140, 203)',
        textAlign: 'center'
    }
    const answerDivStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

    const answerStyle = {
        width: '50%',
        backgroundColor: 'rgb(64, 112, 191)',
        borderRadius: '30px',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1em',
        margin: '1em'
    }
    const selectedStyle = {
        width: '50%',
        backgroundColor: 'rgb(64, 112, 191)',
        borderRadius: '30px',
        border: '1px solid rgb(64, 112, 191)',
        color: 'rgb(64, 112, 191)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1em',
        margin: '1em',
        backgroundColor: 'white'
    }
    return(
        <div style={divStyle}>
            <div style={questionDivStyle}>
                <p style={questionStyle}>How do you want to proceed?</p>
                <div style={answerDivStyle}>
                    <div 
                        style={tripBuilderState.autoBuild === true ? selectedStyle : answerStyle}
                        onClick={() => proceedInput(true)}
                    >
                        Build me an intinerary
                    </div>
                    <div 
                        style={tripBuilderState.autoBuild === false ? selectedStyle : answerStyle}
                        onClick={() => proceedInput(false)}
                    >
                        I'll choose my own adventure
                    </div>
                </div>
            </div>
        </div>
    )
}

function Time({ timeInput, tripBuilderState }) {
    const [morning, setMorning] = React.useState(tripBuilderState.timeDay.morning);
    const [midDay, setmidDay] = React.useState(tripBuilderState.timeDay.midDay);
    const [evening, setEvening] = React.useState(tripBuilderState.timeDay.evening);

    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const questionDivStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

    const questionStyle = {
        width: '100%',
        fontSize: '2em',
        color: 'rgb(103, 140, 203)',
        textAlign: 'center'
    }

    const answersDivStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }

    const answerDivStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

    const answerTextStyle = {
        fontSize: '1em',
        color: 'rgb(103, 140, 203)',
        width: '100%',
        textAlign: 'center'
        
    }

    const selectedStyle = {
        backgroundColor: 'black'
    }

    // Pass time object up to parent whenever state changes
    React.useEffect(() => {
        const timeObject = {
            morning: morning,
            midDay: midDay,
            evening: evening
        }
        timeInput(timeObject)
    }, [morning, midDay, evening])

    return(
        <div style={divStyle}>
            <div style={questionDivStyle}>
                <p style={questionStyle}>What time(s) of day are you visting?</p>
                <div style={answersDivStyle}>
                    <div 
                        style={answerDivStyle} 
                        style={ morning === true ? selectedStyle : null} 
                        onClick={() => setMorning(!morning)}
                    >
                        <img src={Sunrise}/>
                        <p style={answerTextStyle}>Morning</p>
                    </div>
                    <div 
                        style={answerDivStyle}
                        style={ midDay === true ? selectedStyle : null}
                        onClick={() => setmidDay(!midDay)}
                    >
                        <img src={Midday}/>
                        <p style={answerTextStyle}>Mid-day</p>
                    </div>
                    <div 
                        style={answerDivStyle}
                        style={ evening === true ? selectedStyle : null}
                        onClick={() => setEvening(!evening)}
                    >
                        <img src={Sunset}/>
                        <p style={answerTextStyle}>Evening</p>
                    </div>
                </div>
            </div>            
        </div>
    )
}

function Activity({ activityInput, tripBuilderState }) {
    const [eat, setEat] = React.useState(tripBuilderState.activities.eat);
    const [shop, setShop] = React.useState(tripBuilderState.activities.shop);
    const [caffeinate, setCaffeinate] = React.useState(tripBuilderState.activities.caffeinate);
    const [sightsee, setSightsee] = React.useState(tripBuilderState.activities.sightsee);
    const [drink, setDrink] = React.useState(tripBuilderState.activities.drink);

    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const questionDivStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

    const questionStyle = {
        width: '100%',
        fontSize: '2em',
        color: 'rgb(103, 140, 203)',
        textAlign: 'center'
    }

    const answersDivStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

    const answerDivStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

    const answerTextStyle = {
        width: '100%',
        fontSize: '1em',
        color: 'rgb(103, 140, 203)',
        textAlign: 'center'
    }
    const selectedStyle = {
        backgroundColor: 'black'
    }

    // Hook to pass activities to parent
    React.useEffect(() => {
        const activitiesObject = {
            eat: eat,
            shop: shop, 
            caffeinate: caffeinate, 
            sightsee: sightsee,
            drink: drink
        }
        activityInput(activitiesObject)
    }, [eat, shop, caffeinate, sightsee, drink])
    return(
        <div style={divStyle}>
            <div style={questionDivStyle}>
                <p style={questionStyle}>What activities would you like to do?</p>
                <div style={answersDivStyle}>
                    <div 
                        style={answerDivStyle}
                        style={eat ? selectedStyle : null}
                        onClick={() => setEat(!eat)} 
                    >
                        <img src={Eat}/>
                        <p style={answerTextStyle}>Eat</p>
                    </div>
                    <div 
                        style={answerDivStyle}
                        style={shop ? selectedStyle : null}
                        onClick={() => setShop(!shop)}
                    >
                        <img src={Shop}/>
                        <p style={answerTextStyle}>Shop</p>
                    </div>
                    <div 
                        style={answerDivStyle}
                        style={caffeinate ? selectedStyle : null}
                        onClick={() => setCaffeinate(!caffeinate)}
                    >
                        <img src={Caffeinate}/>
                        <p style={answerTextStyle}>Caffeinate</p>
                    </div>
                    <div 
                        style={answerDivStyle}
                        style={sightsee ? selectedStyle : null}
                        onClick={() => setSightsee(!sightsee)}
                    >
                        <img src={Sightsee}/>
                        <p style={answerTextStyle}>Sight-see</p>                        
                    </div>
                    <div 
                        style={answerDivStyle}
                        style={drink ? selectedStyle : null}
                        onClick={() => setDrink(!drink)}
                    >
                        <img src={Drink}/>
                        <p style={answerTextStyle}>Drink</p>
                    </div>
                </div>
            </div>
        </div>

    )
}