import './App.css';
import React, {useState, useEffect} from 'react'
import {useRoutes} from 'react-router-dom'
import routes from './routes'
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core'
import { useLocation } from 'react-router-dom';

const themeData = {
  palette:{
    primary:{
      main: '#FFFFFA'
    },
    secondary:{
      main:'#FF312E'
    }
  }
}


const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    const registerVisit = async () => {
      try {
        const response = await fetch('https://lenz-api.bigcapy.com/increment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            app_id: process.env.REACT_APP_LENZ_KEY,
            path: location.pathname,
          }),
        });
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    registerVisit();
  }, [location.pathname]);

  return null;
};


function App() {
  const routing = useRoutes(routes)
  const theme = createMuiTheme(themeData)

  return (
    <ThemeProvider theme = {theme}>
      <div className="App" style = {{height:'100%'}}>
        <Analytics />
        {routing}
      </div>
    </ThemeProvider>
  );
}

export default App;
