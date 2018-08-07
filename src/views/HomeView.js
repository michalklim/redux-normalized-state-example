import React, { Component } from 'react'
import { withRouter, NavLink, Switch, Route } from 'react-router-dom'
import { ACTIVE, ARCHIVED } from 'constants/TodosStatuses'
import styled from 'styled-components'
import { lighten } from 'polished'

import { ms } from 'styles/helpers'
import { ActiveTodosList, ArchivedTodosList, SearchForm, SearchTodosList } from 'containers'
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
  min-height: 40vh;
  padding: 0 0 ${ms(2)} 0;
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
  padding: ${ms(1)} ${ms(0)} ${ms(0)};
  
  &.active {
    color: ${({theme: {colors}}) => colors.accent};
    font-weight: ${({theme: {typo: {weights}}}) => weights.bold};
  }
  
  &:first-child:not(.active) {
    box-shadow: inset -1px 0 5px ${({theme: {colors}}) => lighten(0.02, colors.disabled)};
  }
   &:last-child:not(.active) {
    box-shadow: inset 1px 0 5px ${({theme: {colors}}) => lighten(0.02, colors.disabled)};
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
          <SearchForm />

          <Header>
            <Tab to={`/${ACTIVE}`} exact>Active</Tab>
            <Tab to={`/${ARCHIVED}`} exact>Archived</Tab>
          </Header>

          <Switch>
            <Route path={`/${ACTIVE}`} exact component={ActiveTodosList} />
            <Route path={`/${ARCHIVED}`} exact component={ArchivedTodosList} />
            <Route path={`/search`} exact component={SearchTodosList} />
          </Switch>
        </TodosWrapper>
      </Container>
    )
  }
}

export default withRouter(HomeView)
