import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimeDay } from '../../redux/tripBuilder';
import Button from '@material-ui/core/Button';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';
export default function Time() {
    const tripBuilderState = useSelector(state => state.tripBuilder);
    const [morning, setMorning] = React.useState(tripBuilderState.timeDay.morning);
    const [midDay, setmidDay] = React.useState(tripBuilderState.timeDay.midDay);
    const [evening, setEvening] = React.useState(tripBuilderState.timeDay.evening);
    const dispatch = useDispatch();

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
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

    const buttonStyle = {
        margin: '2em'
    }

    // Pass time object up to parent whenever state changes
    React.useEffect(() => {
        const timeObject = {
            morning: morning,
            midDay: midDay,
            evening: evening
        }
        dispatch(setTimeDay(timeObject))
    }, [morning, midDay, evening])

    return(
        <div style={divStyle}>
            <div style={questionDivStyle}>
                <p style={questionStyle}>What time(s) of day are you visting?</p>
                <div style={answersDivStyle}>
                    <Button
                        style={buttonStyle}
                        variant={morning === true ? "contained" : "outlined"}
                        color="primary"
                        startIcon={<Brightness4Icon/>}
                        onClick={() => setMorning(!morning)}
                    >
                        Morning
                    </Button>
                    <Button
                        style={buttonStyle}
                        variant={midDay === true ? "contained" : "outlined"}
                        color="primary"
                        startIcon={<Brightness5Icon/>}
                        onClick={() => setmidDay(!midDay)}
                    >
                        Mid-day
                    </Button>
                    <Button
                        style={buttonStyle}
                        variant={evening === true ? "contained" : "outlined"}
                        color="primary"
                        startIcon={<NightsStayIcon/>}
                        onClick={() => setEvening(!evening)}
                    >
                        Evening
                    </Button>                    
                </div>
            </div>            
        </div>
    )
}
