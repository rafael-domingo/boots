import './App.css';
import React from 'react'
import Home from './containers/home';
import DayTripList from './containers/dayTripList';
import Logo from './components/Logo';
import DayTripView from './containers/dayTripView';
import AppDrawer from './containers/drawer';
import Questions from './containers/questions';
import { useSelector } from 'react-redux';
import LargeMap from './components/LargeMap';

function App() {
  const [drawer, setDrawer] = React.useState(false)
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
