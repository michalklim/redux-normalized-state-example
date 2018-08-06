import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { ACTIVE } from 'constants/TodosFilters'

import { TodoList } from 'containers'

/* eslint-disable */

class HomeView extends Component {
  componentDidMount = () => {
    const { match, history} = this.props

    if (!match.params.todosFilter) {
      history.push(`/${ACTIVE}`)
    }
  }

  render() {
    return (
      <main>
        to do app
        <TodoList />
      </main>
    )
  }
}

export default withRouter(HomeView)
