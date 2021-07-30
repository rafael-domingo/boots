import React from 'react';


export default function City({ onChange, tripBuilderState }) {
    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
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
    
    const resultsDivStyle = {
        color: 'black',
        width: '100%'
    }

    const resultStyle = {

    }
    return(
        <div style={divStyle}>
            <div style={questionDivStyle}>
                <p style={questionStyle}>What city would you like to visit?</p>
                <input style={textBoxStyle} onChange={onChange} type="text" name="city" value={tripBuilderState.city}></input>
            </div>
            <div style={resultsDivStyle}>
                {
                    tripBuilderState.autoComplete.map(item =>{
                        return  (
                        <div style={resultStyle}>
                            {item.description}
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}