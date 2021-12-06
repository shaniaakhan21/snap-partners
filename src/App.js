import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import Routes from './routes'
import theme from './theme'
import './App.css'
import { authenticate } from './redux/actions'

const App = () => {

  const dispatch = useDispatch()
  // FYI: Dispatch state when the token change.

  if (localStorage.getItem('token')) {
    dispatch(authenticate({ isAuth: true }))
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      dispatch(authenticate({ isAuth: false }))
    }
  }, [localStorage.getItem('token')])

    return (
        <Router>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Routes />
            </ThemeProvider>
        </Router>
    )
}

export default App
