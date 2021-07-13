import React from 'react';
import LargeMap from '../components/LargeMap';

export default function Home() {
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
          <div style={divStyle}>
            <LargeMap />
            <div style={{color: 'white', fontFamily: 'phosphate'}}>
              <h1>Boots</h1>
              <p>Plan your day trip</p>
              <span>Create an account</span>
              <span>Login</span>
            </div>
          </div>
         
        </div>
      
      );
}