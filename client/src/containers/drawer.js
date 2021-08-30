import React from 'react';
import Profile from '../assets/profile.jpeg';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Logo from '../components/Logo';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { signOut } from '../util/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addTripList, setEmail, setTripList, setUid, setUserName, setView, updateTripList } from '../redux/user';
import { resetTripBuilder } from '../redux/tripBuilder';

export default function AppDrawer({drawer, setDrawer}) {
    const dispatch = useDispatch();
    const tripBuilder = useSelector(state => state.tripBuilder)
    const currentTripListState = useSelector(state => state.currentTrip);

    const divStyle = {
        width: '25vw',
        height: '100%',
        backgroundColor: 'rgba(103, 140, 203, 0.8)',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap'

    }

    const profileDivStyle = {
        width: '100%',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

    const buttonsDivStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'space-between',
        flexWrap: 'wrap'
    }

    const profilePicStyle = {
        width: '50%',
        height: 'auto',
        borderRadius: '50%'
    }

    const profileNameStyle = {
        width: '100%',  
        color: 'white',
        fontSize: '3em',
        fontWeight: 'bold'    
    }

    return (
        <Drawer anchor='left' open={drawer} onClose={() => setDrawer(false)}>
            
        <div style={divStyle} onClick={() => setDrawer(false)}>
            <Logo setDrawer={setDrawer} drawer={drawer} color="white" back={true}/>          
            <div style={profileDivStyle}>
                <img src={Profile} style={profilePicStyle}/>
                <p style={profileNameStyle}>Rafael Domingo</p>
            </div>
            <div style={buttonsDivStyle}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '20px'}}>
                    <Button
                        startIcon={<AccountCircleIcon/>}
                        style={{color: 'white'}}
                        size="large"
                        onClick={() => {
                            if (tripBuilder.selectedCity.length > 0) {
                                dispatch(addTripList(currentTripListState))
                                dispatch(resetTripBuilder())
                            } else {
                                console.log('logged')
                                dispatch(updateTripList(currentTripListState))
                            }
                            dispatch(setView('UserHome'))
                        }}
                    >
                        Your Trips
                    </Button>
                </div>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '20px'}}>            
                    <Button
                        variant="contained"
                        color="secondary"          
                        size="large"          
                        startIcon={<ExitToAppIcon />}
                        onClick={() => signOut().then((result) => {
                            console.log(result)
                            dispatch(setView('Home'))
                            if (result === undefined) {
                                dispatch(setUserName(''))
                                dispatch(setEmail(''))
                                dispatch(setUid(''))
                                dispatch(setTripList([]))
                                

                            } else {
                                console.log('Sign out Error')
                            }
                         
                        })}
                    >                   
                        Sign Out
                    </Button>
                </div>
            </div>
           
        </div>
        </Drawer>
    )
}