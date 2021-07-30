import React from 'react';
import Eat from '../../assets/eat.png';
import Shop from '../../assets/shop.png';
import Caffeinate from '../../assets/caffeinate.png';
import Sightsee from '../../assets/sightsee.png';
import Drink from '../../assets/drink.png';
import { useDispatch, useSelector } from 'react-redux';
import { setActivities } from '../../redux/tripBuilder';

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
        justifyContent: 'space-between',
        alignItems: 'center'
    }

    const answerDivStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

    const answerTextStyle = {
        width: '100%',
        fontSize: '1em',
        color: 'rgb(103, 140, 203)',
        textAlign: 'center'
    }
    const selectedStyle = {
        backgroundColor: 'black'
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
                    <div 
                        style={answerDivStyle}
                        style={eat ? selectedStyle : null}
                        onClick={() => setEat(!eat)} 
                    >
                        <img src={Eat}/>
                        <p style={answerTextStyle}>Eat</p>
                    </div>
                    <div 
                        style={answerDivStyle}
                        style={shop ? selectedStyle : null}
                        onClick={() => setShop(!shop)}
                    >
                        <img src={Shop}/>
                        <p style={answerTextStyle}>Shop</p>
                    </div>
                    <div 
                        style={answerDivStyle}
                        style={caffeinate ? selectedStyle : null}
                        onClick={() => setCaffeinate(!caffeinate)}
                    >
                        <img src={Caffeinate}/>
                        <p style={answerTextStyle}>Caffeinate</p>
                    </div>
                    <div 
                        style={answerDivStyle}
                        style={sightsee ? selectedStyle : null}
                        onClick={() => setSightsee(!sightsee)}
                    >
                        <img src={Sightsee}/>
                        <p style={answerTextStyle}>Sight-see</p>                        
                    </div>
                    <div 
                        style={answerDivStyle}
                        style={drink ? selectedStyle : null}
                        onClick={() => setDrink(!drink)}
                    >
                        <img src={Drink}/>
                        <p style={answerTextStyle}>Drink</p>
                    </div>
                </div>
            </div>
        </div>

    )
}