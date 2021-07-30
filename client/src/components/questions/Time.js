import React from 'react';
import Sunrise from '../../assets/sunrise.png';
import Sunset from '../../assets/sunset.png';
import Midday from '../../assets/midday.png';


export default function Time({ timeInput, tripBuilderState }) {
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
