import React, { Component } from 'react'
import { withRouter, NavLink, Switch, Route } from 'react-router-dom'
import { ACTIVE, ARCHIVED } from 'constants/TodosFilters'
import styled from 'styled-components'

import { ms } from 'styles/helpers'
import { ActiveTodosList, ArchivedTodosList } from 'containers'
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
  border-radius: ${ms(-4)};
  overflow: hidden;
`

const Header = styled.nav`
  display: grid;
  grid-template-columns: 50% 50%;
`

const Tab = styled(NavLink)`
  color: ${({theme: {colors}}) => colors.disabled};
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  border-bottom: 1px solid ${({theme: {colors}}) => colors.disabled};
  padding: ${ms(1)} ${ms(0)} ${ms(0)};
  
  &.active {
    color: ${({theme: {colors}}) => colors.accent}
  }
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
          <Header>
            <Tab to={`/${ACTIVE}`} exact>Active</Tab>
            <Tab to={`/${ARCHIVED}`} exact>Archived</Tab>
          </Header>
          <Switch>
            <Route path={`/${ACTIVE}`} exact component={ActiveTodosList} />
            <Route path={`/${ARCHIVED}`} exact component={ArchivedTodosList} />
          </Switch>
        </TodosWrapper>
      </Container>
    )
  }
}

export default withRouter(HomeView)
