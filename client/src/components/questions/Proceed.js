import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAutoBuild } from '../../redux/tripBuilder';
export default function Proceed() {
    const tripBuilderState = useSelector(state => state.tripBuilder);
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

    const handleInput = (autoBuild) => {
        dispatch(setAutoBuild(autoBuild))
    }
    return(
        <div style={divStyle}>
            <div style={questionDivStyle}>
                <p style={questionStyle}>How do you want to proceed?</p>
                <div style={answerDivStyle}>
                    <div 
                        style={tripBuilderState.autoBuild === true ? selectedStyle : answerStyle}
                        onClick={() => handleInput(true)}
                    >
                        Build me an intinerary
                    </div>
                    <div 
                        style={tripBuilderState.autoBuild === false ? selectedStyle : answerStyle}
                        onClick={() => handleInput(false)}
                    >
                        I'll choose my own adventure
                    </div>
                </div>
            </div>
        </div>
    )
}