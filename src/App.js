import './App.css';
import React, {useState, useEffect} from 'react'
import {useRoutes} from 'react-router-dom'
import routes from './routes'
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core'

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

function App() {
  const routing = useRoutes(routes)
  const theme = createMuiTheme(themeData)

  return (
    <ThemeProvider theme = {theme}>
      <div className="App" style = {{height:'100%'}}>
        {routing}
      </div>
    </ThemeProvider>
  );
}

export default App;
