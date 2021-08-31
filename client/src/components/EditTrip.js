import { Button } from '@material-ui/core';
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import BuildIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { deleteTrip, setView } from '../redux/user';

export default function EditTrip({ reorder, setReorder, currentTripListState, setDialog, edit, setEdit}) {
    const dispatch = useDispatch()
    const windowWidth = window.innerWidth
    const divStyle = {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',

    }

    return (
        <div style={divStyle}>
            <Button 
                size="small"
                style={reorder ? {display: 'none'} : {marginRight: '1em'}} 
                startIcon={<EditIcon/>}
                color="primary"
                onClick={() => {
                    setReorder(!reorder)
                    setEdit(true)
                }}
            >
                <p style={{fontSize: windowWidth < 400 ? '0.75em' : '1em'}}>Edit</p>
            </Button>
            <Button
                size="small"
                style={reorder ? {marginRight: '1em'} : {display: 'none'}}
                variant="contained"
                startIcon={<DeleteIcon/>}
                color="secondary"
                onClick={() => {
                    dispatch(deleteTrip(currentTripListState.tripId))
                    dispatch(setView('UserHome'))
                }}
            >
                <p style={{fontSize: windowWidth < 400 ? '0.75em' : '1em'}}>Delete This Trip</p>
                
            </Button>
            <Button
                size="small"
                style={reorder ? {marginRight: '1em'} : {display: 'none'}}
                variant="outlined"
                startIcon={<BuildIcon/>}
                color="primary"
                onClick={() => {
                    setDialog(true)
                }}
            >
                <p style={{fontSize: windowWidth < 400 ? '0.75em' : '1em'}}>Trip Builder</p>
            </Button>
            <Button
                size="small"
                style={reorder ? {marginRight: '1em'} : {display: 'none'}}
                variant="contained"
                startIcon={<EditIcon/>}
                color="primary"
                onClick={() => {
                    setReorder(!reorder)
                    setEdit(true)
                }}
            >
                <p style={{fontSize: windowWidth < 400 ? '0.75em' : '1em'}}>Done</p>
            </Button>
            
        </div>
    )
}