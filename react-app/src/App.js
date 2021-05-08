import React from 'react'
import './index.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { AuthProvider } from './authContext'

import ColorGrid from './views/ColorGrid'
import Home from './views/Home'
import Navbar from './components/Navbar'
import SignUp from './views/SignUp'
import LogIn from './views/LogIn'
import Dashboard from './views/Dashboard'
import { useAuth } from './authContext'

const Routing = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <Navbar />

      <Switch>
        <Route path="/color-grid">
          <ColorGrid />
        </Route>
        <Route path="/sign-up">
          {currentUser ? <Redirect to="/dashboard" /> : <SignUp />}
        </Route>
        <Route path="/log-in">
          {currentUser ? <Redirect to="/dashboard" /> : <LogIn />}
        </Route>
        <Route path="/dashboard">
          {currentUser ? <Dashboard /> : <Redirect to="/" />}
        </Route>
        <Route>
          <Home />
        </Route>
      </Switch>
    </>
  )
}

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </Router>
  )
}

export default App
