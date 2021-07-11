import './App.css';
import Home from './containers/home';
import {React, useRef} from 'react'
import { Loader } from '@googlemaps/js-api-loader';
import Maps from './components/Maps';
import DayTripList from './containers/dayTripList';
import Logo from './components/Logo';
import DayTripView from './containers/dayTripView';
import Drawer from './containers/drawer';
import LocationDetail from './components/LocationDetail';
function App() {
  const divStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(64, 112, 191, 0.6)'
  }
  return (
    <div className="App">
      <Logo />
     {/* <Home /> */}
     {/* <DayTripList /> */}
     {/* <Drawer /> */}
     {/* <DayTripView /> */}
     <LocationDetail/>
    </div>
  
  );
}

export default App;
