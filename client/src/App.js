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
import Questions from './components/Questions';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchView from './containers/searchView';

function App() {
  const [drawer, setDrawer] = React.useState(false)

  return (
    <Router>
      <Logo />
      {
        drawer && <Drawer />        
      }
      <Switch>
        <Route path="/list">
          <DayTripList />
        </Route>
        <Route path="/trip">
          <DayTripView />
        </Route>
        <Route path="/location">
          <Location />
        </Route>
        <Route path="/questions">
          <Questions />
        </Route>
        <Route path="/search">
          <SearchView />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>    
    </Router>

   
  
  );
}

export default App;
