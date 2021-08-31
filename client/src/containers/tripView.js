import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Maps from '../components/Maps';
import TripBuilderWidget from '../components/TripBuilderWidget';
import List from '../components/List';
import EditTrip from '../components/EditTrip';
import LocationDetail from '../components/LocationDetail';
import { setFitBounds } from '../redux/maps';

export default function TripView() {
    const currentTripListState = useSelector(state => state.currentTrip)
    const [dialog, setDialog] = React.useState(false)
    const [reorder, setReorder] = React.useState(false)
    const [detail, setDetail] = React.useState(false)    
    const [edit, setEdit] = React.useState(false)
    const windowWidth = window.innerWidth
    const dispatch = useDispatch()
    const handleDialog = () => {
        setDialog(!dialog)
    }
    const handleClick = () => {        
        setDetail(!detail);
        dispatch(setFitBounds(detail)) 

    }    

    const mapDivStyle = {
        height: windowWidth < 400 ? null : 'auto',
        width: windowWidth < 400 ? null : '50%',        
        overflow: 'hidden'
    }

    const locationsDivStyle = {
        width: windowWidth < 400 ? '100%' : '50%',
        marginTop: windowWidth < 400 ? '50%' : '0',  
        height: windowWidth < 400 ? 'auto' :'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        overflowY: 'scroll',
        overflowX: 'hidden',
        flexDirection: 'column'

        
    }

    const cityNameStyle = {
        color: 'rgb(64, 112, 191)',
        fontSize: windowWidth < 400 ? '2em' : '3em',
        fontWeight: 'bold',
  
    }

    const listDivStyle = {
        overflowY: 'scroll',
        overflowX: 'hidden',
        height: '100%',
        width: '100%'
    }
    return (
        <div style={{display: 'flex', width: '100%', height: '100vh'}}>
            <div style={mapDivStyle}>
                <Maps handleClick={handleClick} edit={edit} setEdit={setEdit}/>
            </div>
            <div style={locationsDivStyle}>
                {
                    !detail && (
                        <>
                        <h1 style={cityNameStyle}>{currentTripListState.name}</h1>
                        <TripBuilderWidget open={dialog} handleOpen={handleDialog}/>
                        <EditTrip edit={edit} setEdit={setEdit} reorder={reorder} setReorder={setReorder} currentTripListState={currentTripListState} setDialog={setDialog}/>
        
                        <div style={listDivStyle}>
                            <List locations={currentTripListState.destinations} handleClick={handleClick} travelTime={currentTripListState.travelTime} reorderList={reorder}/>
                        </div>
                        </>
                    )
                }
                {
                    detail && (
                        <>
                            <LocationDetail handleClick={handleClick}/>
                        </>
                    )
                }
               
            </div>     

        </div>
    )
}