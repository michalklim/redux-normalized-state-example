import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { ACTIVE } from 'constants/TodosFilters'
import styled from 'styled-components'

import { ms } from 'styles/helpers'
import { TodoList } from 'containers'
import { historyShape, matchShape } from 'constants/Shapes'

const Container = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${ms(2)};
`

const TodosWrapper = styled.div`
  width: 30%;
  background: ${({theme: {colors}}) => colors.secondary};
  padding: ${ms(2)};
  border-radius: ${ms(-4)};
`

class HomeView extends Component {
  static propTypes = {
    history: historyShape.isRequired,
    match: matchShape.isRequired,
  }

  componentDidMount = () => {
    const { match, history} = this.props

    if (!match.params.todosFilter) {
      history.push(`/${ACTIVE}`)
    }
  }

  render() {
    return (
      <Container>
        <TodosWrapper>
          <TodoList />
        </TodosWrapper>
      </Container>
    )
  }
}

export default withRouter(HomeView)
