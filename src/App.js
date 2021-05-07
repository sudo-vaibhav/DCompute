import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ColorGrid from './views/ColorGrid'
import Home from './views/Home'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/color-grid">
            <ColorGrid />
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
