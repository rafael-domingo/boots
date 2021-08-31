import React from 'react';
import Eat from '../../assets/eat.png';
import Shop from '../../assets/shop.png';
import Caffeinate from '../../assets/caffeinate.png';
import Sightsee from '../../assets/sightsee.png';
import Drink from '../../assets/drink.png';
import { useDispatch, useSelector } from 'react-redux';
import { setActivities } from '../../redux/tripBuilder';
import Button from '@material-ui/core/Button';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import PanoramaIcon from '@material-ui/icons/Panorama';
import LocalBarIcon from '@material-ui/icons/LocalBar';
export default function Activity() {
    const tripBuilderState = useSelector(state => state.tripBuilder);
    const dispatch = useDispatch();
    const [eat, setEat] = React.useState(tripBuilderState.activities.eat);
    const [shop, setShop] = React.useState(tripBuilderState.activities.shop);
    const [caffeinate, setCaffeinate] = React.useState(tripBuilderState.activities.caffeinate);
    const [sightsee, setSightsee] = React.useState(tripBuilderState.activities.sightsee);
    const [drink, setDrink] = React.useState(tripBuilderState.activities.drink);

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

    const answersDivStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

    const buttonStyle = {
        margin: '2em',
        
    }

    // Hook to pass activities to parent
    React.useEffect(() => {
        const activitiesObject = {
            eat: eat,
            shop: shop, 
            caffeinate: caffeinate, 
            sightsee: sightsee,
            drink: drink
        }
        dispatch(setActivities(activitiesObject))
    }, [eat, shop, caffeinate, sightsee, drink])
    return(
        <div style={divStyle}>
            <div style={questionDivStyle}>
                <p style={questionStyle}>What activities would you like to do?</p>
                <div style={answersDivStyle}>
                    <Button
                        style={buttonStyle}
                        variant={eat ? "contained" : "outlined"}
                        color="primary"
                        startIcon={<RestaurantIcon/>}
                        onClick={() => setEat(!eat)} 
                    >
                        Eat
                    </Button>
                    <Button
                        style={buttonStyle}
                        variant={shop ? "contained" : "outlined"}
                        color="primary"
                        startIcon={<ShoppingCartIcon/>}
                        onClick={() => setShop(!shop)}
                    >
                        Shop
                    </Button>
                    <Button
                        style={buttonStyle}
                        variant={caffeinate ? "contained" : "outlined"}
                        color="primary"
                        startIcon={<LocalCafeIcon/>}
                        onClick={() => setCaffeinate(!caffeinate)}
                    >
                        Coffee
                    </Button>
                    <Button
                        style={buttonStyle}
                        variant={sightsee ? "contained" : "outlined"}
                        color="primary"
                        startIcon={<PanoramaIcon/>}
                        onClick={() => setSightsee(!sightsee)}
                    >
                        Sight-see
                    </Button>
                    <Button
                        style={buttonStyle}
                        variant={drink ? "contained" : "outlined"}
                        color="primary"
                        startIcon={<LocalBarIcon/>}
                        onClick={() => setDrink(!drink)}
                    >
                        Drink
                    </Button>                   
                </div>
            </div>
        </div>

    )
}