import './App.css';
import React from 'react'
// import { Loader } from '@googlemaps/js-api-loader';
// import Maps from './components/Maps';
import Home from './containers/home';
import DayTripList from './containers/dayTripList';
import Logo from './components/Logo';
import DayTripView from './containers/dayTripView';
import AppDrawer from './containers/drawer';
import Location from './containers/location';
import Questions from './containers/questions';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchView from './containers/searchView';
import { setView } from './redux/user';
import { useDispatch, useSelector } from 'react-redux';
import LargeMap from './components/LargeMap';

function App() {
  const [drawer, setDrawer] = React.useState(false)
  const dispatch = useDispatch();

  const viewState = useSelector(state => state.user.view)
  if (viewState === 'Home') {
    return (
      <div>
        <LargeMap />
        <Home />
      </div>
    
    )
  } 

  else if (viewState === 'UserHome') {
    return (
      <div>        
      <AppDrawer drawer={drawer} setDrawer={setDrawer}/>
        
      <Logo setDrawer={setDrawer} drawer={drawer}/>
      <DayTripList/>
    </div>
    )
  }
  else if (viewState === 'Trip') {
    return (
      <div>
         <AppDrawer drawer={drawer} setDrawer={setDrawer}/>
         <Logo setDrawer={setDrawer} drawer={drawer}/>
        <DayTripView />
      </div>
    )
  } 
  else if (viewState === 'Questions') {
    return (
      <div>
       <AppDrawer drawer={drawer} setDrawer={setDrawer}/>
         <Logo setDrawer={setDrawer} drawer={drawer}/>
      <Questions />
    </div>
    )
  }

}

export default App;
