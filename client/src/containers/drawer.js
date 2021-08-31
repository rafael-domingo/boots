import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Logo from '../components/Logo';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { deleteUser, signOut } from '../util/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addTripList, setEmail, setPhone, setProfilePicture, setTripList, setUid, setUserName, setView, updateTripList } from '../redux/user';
import { resetTripBuilder } from '../redux/tripBuilder';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Card, CardActions, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
export default function AppDrawer({drawer, setDrawer}) {
    const dispatch = useDispatch()
    const tripBuilder = useSelector(state => state.tripBuilder)
    const currentTripListState = useSelector(state => state.currentTrip)
    const user = useSelector(state => state.user)
    const [dialog, setDialog] = React.useState(false)
    
    const divStyle = {
        minWidth: '25vw',
        height: '100%',
        backgroundColor: 'rgba(103, 140, 203, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'

    }
  
    return (
        <>
        <Dialog
            open={dialog}
            onClose={() => {}}
        >
            <DialogTitle>Delete your account</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete your account? 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setDialog(false)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                        deleteUser()
                        dispatch(setView('Home'))
                        dispatch(setUserName(''))
                        dispatch(setEmail(''))
                        dispatch(setUid(''))
                        dispatch(setPhone(''))
                        dispatch(setProfilePicture(''))
                        dispatch(setTripList([]))
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
        <Drawer anchor='left' open={drawer} onClose={() => setDrawer(false)}>            
        <div style={divStyle} onClick={() => setDrawer(false)}>
        <Logo setDrawer={setDrawer} drawer={drawer} color="white" back={true}/>          
            <Card style={{background: 'rgb(64, 112, 191)', width: '75%', color: 'white'}}>
                <CardHeader 
                    avatar={
                        <Avatar src={user.profilePicture} style={{height: '3em', width: '3em'}}>
                        <FaceIcon/>
                        </Avatar>
                    }
                    title={
                        user.username !== null ? user.username : null
                    }
                    subheader={
                        user.email !== null ? user.email : user.phone
                    }              
                />
                <CardActions style={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', alignItems: 'flex-end', height: 'auto'}}>
                    <Button
                            startIcon={<AccountCircleIcon/>}
                            style={{color: 'white', width: '100%', margin: '1em'}}
                            size="large"
                            onClick={() => {
                                if (tripBuilder.selectedCity.length > 0) {
                                    dispatch(addTripList(currentTripListState))
                                    dispatch(resetTripBuilder())
                                } else if (user.view === 'Trip') {
                                    console.log('logged')
                                    dispatch(updateTripList(currentTripListState))
                                }
                                dispatch(setView('UserHome'))
                            }}
                        >
                        Your Trips
                    </Button>
                    <Button 
                        style={{color: 'white', width: '100%', margin: '1em'}}
                        startIcon={<DeleteForeverIcon/>}
                        onClick={() => {
                            setDialog(true)
                        }}
                    >
                        Delete Account
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"   
                        style={{margin: '1em', width: '100%'}}                                       
                        startIcon={<ExitToAppIcon />}
                        onClick={() => signOut().then((result) => {
                            console.log(result)
                            dispatch(setView('Home'))
                            if (result === undefined) {
                                dispatch(setView('Home'))
                                dispatch(setUserName(''))
                                dispatch(setEmail(''))
                                dispatch(setUid(''))
                                dispatch(setPhone(''))
                                dispatch(setProfilePicture(''))
                                dispatch(setTripList([]))
                            } else {
                                console.log('Sign out Error')
                            }                         
                        })}
                    >                   
                        Sign Out
                    </Button>
                </CardActions>           
            </Card>                        
        </div>
        </Drawer>
    </>
    )
}