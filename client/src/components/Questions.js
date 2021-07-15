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

export default function Questions() {
    const [city, setCity] = React.useState(true);
    const [travel, setTravel] = React.useState(true);
    const [proceed, setProceed] = React.useState(false);
    const [time, setTime] = React.useState(false);
    const [activity, setActivity] = React.useState(false);

    const divStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    }

    const questionsDivStyle = {
        padding: '2em'
    }

    return (
        <div style={divStyle}>
            <img src={LeftArrow}/>
            <div style={questionsDivStyle}>
                {
                    city && <City />
                }
                {
                    travel && <Travel />
                }
                {
                    proceed && <Proceed />
                }
                {
                    time && <Time />
                }
                {
                    activity && <Activity />
                }
            </div>     
            <img src={RightArrow}/>
        </div>
    )
}

function City() {
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
                <input style={textBoxStyle} type="text" name="city"></input>
            </div>
        </div>
    )
}


function Travel() {
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
    return(
        <div style={divStyle}>
            <div style={questionDivStyle}>
                <p style={questionStyle}>How will you be traveling?</p>
                <div style={choicesDivStyle}>
                    <img src={Car} />
                    <img src={Bicycle} />
                    <img src={Walk} />
                </div>
            </div>
        </div>
        
    )
}

function Proceed() {
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
                    <div style={answerStyle}>Build me an intinerary</div>
                    <div style={answerStyle}>I'll choose my own adventure</div>
                </div>
            </div>
        </div>
    )
}

function Time() {
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

    return(
        <div style={divStyle}>
            <div style={questionDivStyle}>
                <p style={questionStyle}>What time(s) of day are you visting?</p>
                <div style={answersDivStyle}>
                    <div style={answerDivStyle}>
                        <img src={Sunrise}/>
                        <p style={answerTextStyle}>Morning</p>
                    </div>
                    <div style={answerDivStyle}>
                        <img src={Midday}/>
                        <p style={answerTextStyle}>Mid-day</p>
                    </div>
                    <div style={answerDivStyle}>
                        <img src={Sunset}/>
                        <p style={answerTextStyle}>Evening</p>
                    </div>
                </div>
            </div>            
        </div>
    )
}

function Activity() {
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
    return(
        <div style={divStyle}>
            <div style={questionDivStyle}>
                <p style={questionStyle}>What activities would you like to do?</p>
                <div style={answersDivStyle}>
                    <div style={answerDivStyle}>
                        <img src={Eat}/>
                        <p style={answerTextStyle}>Eat</p>
                    </div>
                    <div style={answerDivStyle}>
                        <img src={Shop}/>
                        <p style={answerTextStyle}>Shop</p>
                    </div>
                    <div style={answerDivStyle}>
                        <img src={Caffeinate}/>
                        <p style={answerTextStyle}>Caffeinate</p>
                    </div>
                    <div style={answerDivStyle}>
                        <img src={Sightsee}/>
                        <p style={answerTextStyle}>Sight-see</p>                        
                    </div>
                    <div style={answerDivStyle}>
                        <img src={Drink}/>
                        <p style={answerTextStyle}>Drink</p>
                    </div>
                </div>
            </div>
        </div>

    )
}