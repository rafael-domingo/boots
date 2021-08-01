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
import { Yelp } from './util/Yelp';
function App() {
  const [drawer, setDrawer] = React.useState(false)
  const dispatch = useDispatch();

  const viewState = useSelector(state => state.user.view)
  if (viewState === 'Home') {
    return (
      <div>
        {
          drawer && <Drawer />
        }
        <Logo onMouseEnter={() => setDrawer(true)}/>
        <DayTripList />
      </div>
    
    )
  } 
  else if (viewState === 'Trip') {
    return (
      <div>
        {
          drawer && <Drawer />
        }
        <Logo onMouseEnter={() => setDrawer(true)}/>
        <DayTripView />
      </div>
    )
  } 
  else if (viewState === 'Questions') {
    return (
      <div>
      {
        drawer && <Drawer />
      }
      <Logo onMouseEnter={() => setDrawer(true)}/>
      <Questions />
    </div>
    )
  }
  // return (
  //   <Router>
  //     <Logo />
  //     {
  //       drawer && <Drawer />        
  //     }
  //     <Switch>
  //       <Route path="/list">
  //         <DayTripList />
  //       </Route>
  //       <Route path="/trip">
  //         <DayTripView />
  //       </Route>
  //       <Route path="/location">
  //         <Location />
  //       </Route>
  //       <Route path="/questions">
  //         <Questions />
  //       </Route>
  //       <Route path="/search">
  //         <SearchView />
  //       </Route>
  //       <Route path="/">
  //         <Home />
  //       </Route>
  //     </Switch>    
  //   </Router>

   
  
  // );
}

export default App;
