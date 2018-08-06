import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

import { HomeView } from 'views'

function Routes() {
  return (
    <Router>
      <Route path="/" component={HomeView} />
    </Router>
  )
}

export default Routes
