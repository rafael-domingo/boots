import './App.css';
import React from 'react'
// import { Loader } from '@googlemaps/js-api-loader';
// import Maps from './components/Maps';
import Home from './containers/home';
import DayTripList from './containers/dayTripList';
import Logo from './components/Logo';
import DayTripView from './containers/dayTripView';
import Drawer from './containers/drawer';
import Location from './containers/location';
import Questions from './containers/questions';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchView from './containers/searchView';
import { setView } from './redux/user';
import { useDispatch, useSelector } from 'react-redux';
import Login from './containers/login';
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
  else if (viewState === 'Login') {
    return (
      <div>
        <Login state='Login'/>
      </div>
    )
  }
  else if (viewState === 'SignUp') {
    return (
      <div>
        <Login state='SignUp'/>
      </div>
    )
  }
  else if (viewState === 'UserHome') {
    return (
      <div>

      <Logo onMouseEnter={() => setDrawer(true)}/>
      <DayTripList />
    </div>
    )
  }
  else if (viewState === 'Trip') {
    return (
      <div>
        <Logo onMouseEnter={() => setDrawer(true)}/>
        <DayTripView />
      </div>
    )
  } 
  else if (viewState === 'Questions') {
    return (
      <div>
      <Logo onMouseEnter={() => setDrawer(true)}/>
      <Questions />
    </div>
    )
  }

}

export default App;
