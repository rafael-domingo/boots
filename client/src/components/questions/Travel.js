import React from 'react';
import Bicycle from '../../assets/bicycle.png';
import Car from '../../assets/car.png';
import Walk from '../../assets/walk.png';
import { useDispatch, useSelector } from 'react-redux';
import { setTransportation } from '../../redux/tripBuilder';

export default function Travel() {
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
    const choicesDivStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
    const selectedStyle = {
        backgroundColor: 'black'
    }

    const handleInput = (transport) => {
        dispatch(setTransportation(transport))
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
                            handleInput('Car')}
                            }
                    />
                    <img 
                        style={ tripBuilderState.transportation == 'Bicycle' ? selectedStyle : null } 
                        src={Bicycle} 
                        onClick={() => {
                            handleInput('Bicycle')}
                            }
                    />
                     <img 
                        style={ tripBuilderState.transportation == 'Walk' ? selectedStyle : null } 
                        src={Walk} 
                        onClick={() => {
                            handleInput('Walk')}
                            }
                    />
                </div>
            </div>
        </div>
        
    )
}