import React from 'react'
import './index.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ColorGrid from './views/ColorGrid'
import Home from './views/Home'
import Navbar from './components/Navbar'
import SignUp from './views/SignUp'
import LogIn from './views/LogIn'
import Dashboard from './views/Dashboard'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />

        <Switch>
          <Route path="/color-grid">
            <ColorGrid />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/log-in">
            <LogIn />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route>
            <Home />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App
