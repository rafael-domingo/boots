import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAutoBuild } from '../../redux/tripBuilder';
import Button from '@material-ui/core/Button';

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

    const buttonStyle = {
        margin: '2em'
    }

    const handleInput = (autoBuild) => {
        dispatch(setAutoBuild(autoBuild))
    }
    return(
        <div style={divStyle}>
            <div style={questionDivStyle}>
                <p style={questionStyle}>How do you want to proceed?</p>
                <div style={answerDivStyle}>
                    <Button
                        style={buttonStyle}
                        variant={tripBuilderState.autoBuild === true ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => handleInput(true)}
                    >
                        Build me an intinerary
                    </Button>
                    <Button
                        style={buttonStyle}
                        variant={tripBuilderState.autoBuild === false ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => handleInput(false)}
                    >
                        I'll choose my own adventure
                    </Button>
                </div>
            </div>
        </div>
    )
}