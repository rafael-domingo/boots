import React from 'react';
import { useSelector } from 'react-redux';
import Eat from '../assets/eat.png';
import Shop from '../assets/shop.png';
import Caffeinate from '../assets/caffeinate.png';
import Sightsee from '../assets/sightsee.png';
import Drink from '../assets/drink.png';
import Sunrise from '../assets/sunrise.png';
import Sunset from '../assets/sunset.png';
import Midday from '../assets/midday.png';
import Bicycle from '../assets/bicycle.png';
import Car from '../assets/car.png';
import Walk from '../assets/walk.png';

export default function TripBuilderWidget() {
    const tripConfiguration = useSelector(state => state.currentTrip.tripBuilder);

    const divStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

    const imgStyle = {
        height: '4em',
        width: 'auto'
    }

    const hideImgStyle = {
        display: 'none'
    }
    
    if (tripConfiguration.autoBuild) {
        return (
            <div style={divStyle}>
                <div>
                    <p>Transportation</p>
                    <img src={Car} style={tripConfiguration.transportation === 'DRIVING' ? imgStyle : hideImgStyle}/>
                    <img src={Bicycle} style={tripConfiguration.transportation === 'BICYCLING' ? imgStyle : hideImgStyle}/>
                    <img src={Walk} style={tripConfiguration.transportation === 'WALKING' ? imgStyle : hideImgStyle}/>
                </div>  
                <div>
                    <p>Time</p>
                    <img src={Sunrise} style={tripConfiguration.timeDay.morning ? imgStyle : hideImgStyle}/>
                    <img src={Midday} style={tripConfiguration.timeDay.midDay ? imgStyle : hideImgStyle}/>
                    <img src={Sunset} style={tripConfiguration.timeDay.evening ? imgStyle : hideImgStyle}/>
                </div>
                <div>
                    <p>Activities</p>
                    <img src={Eat} style={tripConfiguration.activities.eat ? imgStyle : hideImgStyle}/>
                    <img src={Shop} style={tripConfiguration.activities.shop ? imgStyle : hideImgStyle}/>
                    <img src={Caffeinate} style={tripConfiguration.activities.caffeinate ? imgStyle : hideImgStyle}/>
                    <img src={Sightsee} style={tripConfiguration.activities.sightsee ? imgStyle : hideImgStyle}/>
                    <img src={Drink} style={tripConfiguration.activities.drink ? imgStyle : hideImgStyle}/>
                </div>            
            </div>
        )
    } else {
        return (
            <div>
                Enable Auto Trip Builder
            </div>
        )
    }
    
}