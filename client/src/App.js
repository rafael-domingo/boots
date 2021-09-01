import './App.css';
import React from 'react'
import Home from './containers/home';
import DayTripList from './containers/dayTripList';
import Logo from './components/Logo';
import DayTripView from './containers/dayTripView';
import AppDrawer from './containers/drawer';
import Questions from './containers/questions';
import { useDispatch, useSelector } from 'react-redux';
import LargeMap from './components/LargeMap';
import { setWindowWidth } from './redux/maps';

function App() {
  const [drawer, setDrawer] = React.useState(false)
  const viewState = useSelector(state => state.user.view)
  const dispatch = useDispatch()

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      if (document.body.clientWidth < 1000) {
        dispatch(setWindowWidth(true))
      } else {
        dispatch(setWindowWidth(false))
      }
      document.body.style.height = window.innerHeight + "px"
    })
  })
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
