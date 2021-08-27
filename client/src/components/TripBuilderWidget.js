import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import PanoramaIcon from '@material-ui/icons/Panorama';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import { CircularProgress, Divider } from '@material-ui/core';
import { setDestinations, setTravelTime, setTripBuilder } from '../redux/currentTrip';
import { Yelp } from '../util/Yelp';

export default function TripBuilderWidget({open, handleOpen}) {
    const tripConfiguration = useSelector(state => state.currentTrip.tripBuilder);
    const dispatch = useDispatch();
    const [transportation, setTransportation] = React.useState(tripConfiguration.transportation);
    const [autoBuild, setAutoBuild] = React.useState(tripConfiguration.autoBuild);
    const [morning, setMorning] = React.useState(tripConfiguration.timeDay.morning);
    const [midDay, setMidDay] = React.useState(tripConfiguration.timeDay.midDay);
    const [evening, setEvening] = React.useState(tripConfiguration.timeDay.evening);
    const [eat, setEat] = React.useState(tripConfiguration.activities.eat);
    const [shop, setShop] = React.useState(tripConfiguration.activities.shop);
    const [coffee, setCoffee] = React.useState(tripConfiguration.activities.caffeinate);
    const [sightsee, setSightsee] = React.useState(tripConfiguration.activities.sightsee);
    const [drink, setDrink] = React.useState(tripConfiguration.activities.drink);
    const [load, setLoad] = React.useState(false);
    const buttonStyle = {
        marginRight: '5px'
    }

    const dialogText = {
        margin: '5px',

    }

    const handleSave = () => {
        const newTripBuilderObject = {
            city: tripConfiguration.city,
            autoComplete: tripConfiguration.autoComplete,
            selectedCity: tripConfiguration.selectedCity,
            selectedCityLocation: tripConfiguration.selectedCityLocation,
            transportation: transportation,
            autoBuild: autoBuild,
            timeDay: {
                morning: morning,
                midDay: midDay,
                evening: evening
            },
            activities: {
                eat: eat,
                shop: shop,
                caffeinate: coffee,
                sightsee: sightsee,
                drink: drink
            }
        }
        dispatch(setTripBuilder(newTripBuilderObject))

    }

    const handleRefresh = () => {
        handleSave()        
        Yelp.buildTrip(tripConfiguration.selectedCityLocation, {
            morning: morning,
            midDay: midDay,
            evening: evening
        },
        {
            eat: eat,
            shop: shop,
            caffeinate: coffee,
            sightsee: sightsee,
            drink: drink
        })
        .then(response => {
            dispatch(setDestinations(response))
            dispatch(setTravelTime([]))
            handleOpen()
            setLoad(false)
        })
    }

    return (
        <Dialog open={open} handleClose={!open}>
            <DialogTitle>Trip Configuration</DialogTitle>
            <DialogContent style={{marginBottom: '20px'}}>
                <DialogContentText style={dialogText}>
                    How are you traveling?
                </DialogContentText>
                <Button
                    variant={transportation === 'DRIVING' ? "contained" : "outlined"}
                    color="primary"
                    startIcon={<DirectionsCarIcon/>}
                    style={buttonStyle}
                    onClick={() => setTransportation('DRIVING')}
                >
                    Car
                </Button>
                <Button
                    variant={transportation === 'BICYCLING' ? "contained" : "outlined"}
                    color="primary"
                    startIcon={<DirectionsBikeIcon/>}
                    style={buttonStyle}
                    onClick={() => setTransportation('BICYCLING')}
                >
                    Bike
                </Button>
                <Button
                    variant={transportation === 'WALKING' ? "contained" : "outlined"}
                    color="primary"
                    startIcon={<DirectionsWalkIcon/>}
                    style={buttonStyle}
                    onClick={() => setTransportation('WALKING')}
                >
                    Walk
                </Button>
                <DialogContentText style={dialogText}>
                    Auto Trip Builder
                </DialogContentText>
                <Button 
                    variant={autoBuild === true ? "contained" : "outlined"}
                    color="primary"
                    style={buttonStyle}
                    onClick={() => setAutoBuild(true)}
                >
                    Enabled
                </Button>
                <Button 
                    variant={autoBuild === false ? "contained" : "outlined"}
                    color="primary"
                    style={buttonStyle}
                    onClick={() => setAutoBuild(false)}
                >
                    Disabled
                </Button>
                <DialogContentText style={dialogText}>
                    Time of day
                </DialogContentText>
                <Button
                    disabled={autoBuild ? false : true}
                    variant={morning === true ? "contained" : "outlined"}
                    color="primary"
                    startIcon={<Brightness4Icon/>}
                    style={buttonStyle}
                    onClick={() => setMorning(!morning)}
                >
                    Morning
                </Button>
                <Button
                    disabled={autoBuild ? false : true}
                    variant={midDay === true ? "contained" : "outlined"}
                    color="primary"
                    startIcon={<Brightness5Icon/>}
                    style={buttonStyle}
                    onClick={() => setMidDay(!midDay)}
                >
                    Mid-Day
                </Button>
                <Button
                    disabled={autoBuild ? false : true}
                    variant={evening === true ? "contained" : "outlined"}
                    color="primary"
                    startIcon={<NightsStayIcon/>}
                    style={buttonStyle}
                    onClick={() => setEvening(!evening)}
                >
                    Evening
                </Button>
                <DialogContentText style={dialogText}>
                    Activities for your trip
                </DialogContentText>
                <Button
                    disabled={autoBuild ? false : true}
                    variant={eat === true ? "contained" : "outlined"}
                    color="primary"
                    startIcon={<RestaurantIcon/>}
                    style={buttonStyle}
                    onClick={() => setEat(!eat)}
                >
                    Eat
                </Button>
                <Button
                    disabled={autoBuild ? false : true}
                    variant={shop === true ? "contained" : "outlined"}
                    color="primary"
                    startIcon={<ShoppingCartIcon/>}
                    style={buttonStyle}
                    onClick={() => setShop(!shop)}
                >
                    Shop
                </Button>
                <Button
                    disabled={autoBuild ? false : true}
                    variant={coffee === true ? "contained" : "outlined"}
                    color="primary"
                    startIcon={<LocalCafeIcon/>}
                    style={buttonStyle}
                    onClick={() => setCoffee(!coffee)}
                >
                    Coffee
                </Button>
                <Button
                    disabled={autoBuild ? false : true}
                    variant={sightsee === true ? "contained" : "outlined"}
                    color="primary"
                    startIcon={<PanoramaIcon/>}
                    style={buttonStyle}
                    onClick={() => setSightsee(!sightsee)}
                >
                    Sight-see
                </Button>
                <Button
                    disabled={autoBuild ? false : true}
                    variant={drink === true ? "contained" : "outlined"}
                    color="primary"
                    startIcon={<LocalBarIcon/>}
                    style={buttonStyle}
                    onClick={() => setDrink(!drink)}
                >
                    Drink
                </Button>
                
            </DialogContent>
            <Divider variant="middle"/>
            <DialogActions>
                    <Button 
                        color="primary"
                        onClick={() => {
                            handleOpen()
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        color="secondary" 
                        variant="contained"
                        onClick={() => {
                            handleSave()
                            handleOpen()
                        }}
                    >
                        Save
                    </Button>                    
                    <Button 
                        disabled={autoBuild ? false : true}
                        color="secondary" 
                        variant="outlined"
                        onClick={() => {
                            setLoad(true)
                            handleRefresh()
                        }}
                    >
                        Save and Refresh Recommendations
                    </Button>  
                    {
                    load && <CircularProgress/>
                    }                  
                </DialogActions>
                
        </Dialog>
    )
}