import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { HomeView } from 'views'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/:todosFilter?" exact component={HomeView} />
      </Switch>
    </Router>
  )
}

export default Routes
