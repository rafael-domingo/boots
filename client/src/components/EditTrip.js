import { Button } from '@material-ui/core';
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import BuildIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { deleteTrip, setView } from '../redux/user';

export default function EditTrip({ reorder, setReorder, currentTripListState, setDialog, edit, setEdit}) {
    const dispatch = useDispatch()
    const divStyle = {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }

    return (
        <div style={divStyle}>
            <Button 
                style={reorder ? {display: 'none'} : {marginRight: '1em'}} 
                startIcon={<EditIcon/>}
                color="primary"
                onClick={() => {
                    setReorder(!reorder)
                    setEdit(true)
                }}
            >
                Edit
            </Button>
            <Button
                style={reorder ? {marginRight: '1em'} : {display: 'none'}}
                variant="contained"
                startIcon={<DeleteIcon/>}
                color="primary"
                onClick={() => {
                    dispatch(deleteTrip(currentTripListState.tripId))
                    dispatch(setView('UserHome'))
                }}
            >
                Delete This Trip
            </Button>
            <Button
                style={reorder ? {marginRight: '1em'} : {display: 'none'}}
                variant="outlined"
                startIcon={<BuildIcon/>}
                color="primary"
                onClick={() => {
                    setDialog(true)
                }}
            >
                Trip Builder
            </Button>
            <Button
                style={reorder ? {marginRight: '1em'} : {display: 'none'}}
                variant="contained"
                startIcon={<EditIcon/>}
                color="primary"
                onClick={() => {
                    setReorder(!reorder)
                    setEdit(true)
                }}
            >
                Done
            </Button>
            
        </div>
    )
}