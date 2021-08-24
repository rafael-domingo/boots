import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTransportation } from '../../redux/tripBuilder';
import Button from '@material-ui/core/Button';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
export default function Travel() {
    const tripBuilderState = useSelector(state => state.tripBuilder);
    const dispatch = useDispatch();
    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        height: 'auto'
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
        justifyContent: 'center',
        alignItems: 'center'
    }
    const buttonStyle = {
        margin: '2em'
    }

    const handleInput = (transport) => {
        dispatch(setTransportation(transport))
    }
    return(
        <div style={divStyle}>
            <div style={questionDivStyle}>
                <p style={questionStyle}>How will you be traveling?</p>
                <div style={choicesDivStyle}>
                <Button
                    style={buttonStyle}
                    variant={tripBuilderState.transportation === 'DRIVING' ? "contained" : "outlined"}
                    color="primary"
                    // disabled={tripBuilderState.transportation === 'DRIVING' ? false : true}
                    startIcon={<DirectionsCarIcon />}
                    onClick={() => {
                        handleInput('DRIVING')}
                        }
                >
                    Car
                </Button>
                <Button
                    style={buttonStyle}
                    variant={tripBuilderState.transportation === 'BICYCLING' ? "contained" : "outlined"}
                    color="primary"
                    // disabled={tripBuilderState.transportation === 'BICYCLING' ? false : true}
                    startIcon={<DirectionsBikeIcon />}
                    onClick={() => {
                        handleInput('BICYCLING')}
                        }
                >
                    Bike
                </Button>
                <Button
                    style={buttonStyle}
                    variant={tripBuilderState.transportation === 'WALKING' ? "contained" : "outlined"}
                    color="primary"
                    // disabled={tripBuilderState.transportation === 'BICYCLING' ? false : true}
                    startIcon={<DirectionsWalkIcon />}
                    onClick={() => {
                        handleInput('WALKING')}
                        }
                >
                    Walk
                </Button>                 
                </div>
            </div>
        </div>
        
    )
}