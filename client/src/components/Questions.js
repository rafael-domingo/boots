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

import { useDispatch } from 'react-redux';
import { setTripBuilder } from '../redux/user';

export default function Questions() {
    // Handle which question to show based on flow
    var [state, setState] = React.useState(0);
    const views = ['city', 'travel', 'proceed', 'time', 'activity'];
    var view = views[state];
    
    const [formComplete, setFormComplete] = React.useState(false);

    const dispatch = useDispatch();

    // Event handlers for children functions
    var tripBuilder = {}
    const cityInput = (e) => {
        tripBuilder.city = e.target.value
        console.log(tripBuilder)
    }
    const transportationInput = (transport) => {
        tripBuilder.transportation = transport
        console.log(tripBuilder)
    }
    const proceedInput = (autoBuild) => {
        tripBuilder.autoBuild = autoBuild
        console.log(tripBuilder)
    }
    const timeInput = (timeInput) => {
        tripBuilder.timeDay = timeInput
        console.log(tripBuilder)
    }
    const activityInput = (activityInput) => {
        tripBuilder.activities = activityInput
        console.log(tripBuilder)
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
                        view==='city' && <City onChange={cityInput}/>
                    }
                    {
                        view==='travel' && <Travel transportation={transportationInput}/>
                    }
                    {
                        view==='proceed' && <Proceed proceedInput={proceedInput} />
                    }
                    {
                        view==='time' && <Time timeInput={timeInput} />
                    }
                    {
                        view==='activity' && <Activity activityInput={activityInput} />
                    }               
                </div>     
                <img 
                    src={RightArrow} 
                    onClick={() => {
                        if (tripBuilder.autoBuild === false) {
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

function City({ onChange }) {
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
                <input style={textBoxStyle} onChange={onChange} type="text" name="city"></input>
            </div>
        </div>
    )
}


function Travel({ transportation }) {
    const [selected, setSelected] = React.useState();
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
                        style={ selected == 'Car' ? selectedStyle : null } 
                        src={Car} 
                        onClick={() => {
                            setSelected('Car')
                            transportation('Car')}
                            }
                    />
                    <img 
                        style={ selected == 'Bicycle' ? selectedStyle : null } 
                        src={Bicycle} 
                        onClick={() => {
                            setSelected('Bicycle')
                            transportation('Bicycle')}
                            }
                    />
                     <img 
                        style={ selected == 'Walk' ? selectedStyle : null } 
                        src={Walk} 
                        onClick={() => {
                            setSelected('Walk')
                            transportation('Walk')}
                            }
                    />
                </div>
            </div>
        </div>
        
    )
}

function Proceed({ proceedInput }) {
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
    return(
        <div style={divStyle}>
            <div style={questionDivStyle}>
                <p style={questionStyle}>How do you want to proceed?</p>
                <div style={answerDivStyle}>
                    <div style={answerStyle} onClick={() => proceedInput(true)}>Build me an intinerary</div>
                    <div style={answerStyle} onClick={() => proceedInput(false)}>I'll choose my own adventure</div>
                </div>
            </div>
        </div>
    )
}

function Time({ timeInput }) {
    const [morning, setMorning] = React.useState(false);
    const [midDay, setmidDay] = React.useState(false);
    const [evening, setEvening] = React.useState(false);

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
                        style={ morning ? selectedStyle : null} 
                        onClick={() => setMorning(!morning)}
                    >
                        <img src={Sunrise}/>
                        <p style={answerTextStyle}>Morning</p>
                    </div>
                    <div 
                        style={answerDivStyle}
                        style={ midDay ? selectedStyle : null}
                        onClick={() => setmidDay(!midDay)}
                    >
                        <img src={Midday}/>
                        <p style={answerTextStyle}>Mid-day</p>
                    </div>
                    <div 
                        style={answerDivStyle}
                        style={ evening ? selectedStyle : null}
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

function Activity({ activityInput }) {
    const [eat, setEat] = React.useState(false);
    const [shop, setShop] = React.useState(false);
    const [caffeinate, setCaffeinate] = React.useState(false);
    const [sightsee, setSightsee] = React.useState(false);
    const [drink, setDrink] = React.useState(false);

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