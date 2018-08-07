import React, { Component } from 'react'
import { withRouter, NavLink, Switch, Route } from 'react-router-dom'
import { ACTIVE, ARCHIVED } from 'constants/TodosStatuses'
import styled from 'styled-components'
import { lighten } from 'polished'

import { ms } from 'styles/helpers'
import { SearchForm } from 'containers'
import { ActiveTodosView, ArchivedTodosView, SearchTodosView } from 'views'
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

const Title = styled.h1`
  color: ${({theme: {colors}}) => lighten(0.1, colors.accent)};
  font-weight: ${({theme: {typo: {weights}}}) => weights.normal};
  text-align: center;
  margin: ${ms(2)} 0 ${ms(4)} 0;
`

const Wrapper = styled.div`
  width: 100%;
  
  @media (min-width: ${({theme: {mq}}) => `${mq.s}px`}) {
     width: 80%;
  }
  
  @media (min-width: ${({theme: {mq}}) => `${mq.m}px`}) {
     width: 50%;
  }
  
  @media (min-width: ${({theme: {mq}}) => `${mq.l}px`}}) {
     width: 40%;
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
        <Wrapper>
          <Title>Venture Devs Todo app</Title>
          <TodosWrapper>
            <SearchForm />

            <Header>
              <Tab to={`/${ACTIVE}`} exact>Active</Tab>
              <Tab to={`/${ARCHIVED}`} exact>Archived</Tab>
            </Header>

            <Switch>
              <Route path={`/${ACTIVE}`} exact component={ActiveTodosView} />
              <Route path={`/${ARCHIVED}`} exact component={ArchivedTodosView} />
              <Route path={`/search`} exact component={SearchTodosView} />
            </Switch>
          </TodosWrapper>
        </Wrapper>
      </Container>
    )
  }
}

export default withRouter(HomeView)
