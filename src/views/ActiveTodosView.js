import React, {Component, Fragment} from 'react'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { connect } from 'react-redux'
import T from 'prop-types'
import uuid from 'uuid/v4'

import { ListHeader, AddTodoForm } from 'components'
import { UncompletedTodosList, CompletedTodosList } from 'containers'
import * as TodosActions from 'actions/todos'
import { getCompletedTodos, getUncompletedTodos } from 'reducers/todos'
import { todoShape } from 'constants/Shapes'
import { ms } from 'styles/helpers'

const Filters = styled.div`
  display: flex;
  text-transform: uppercase;
  align-items: center;
  padding: ${ms(-1)} ${ms(2)} 0;
  color: ${({theme: {colors}}) => colors.disabled};
  font-weight: ${({theme: {typo: {weights}}}) => weights.bold};
  font-size: ${ms(-1)};
`

const Filter = styled.button`
  background: none;
  border: none;
  padding: ${ms(-4)} ${ms(-6)};
  margin: 0 ${ms(-4)};
  text-transform: uppercase;
  font-family: ${({theme: {typo: {fonts}}}) => fonts.primary};
  color: ${({isActive, theme: {colors}}) => isActive ? colors.accent : colors.disabled};
  cursor: pointer;
`

const filters = {
  ALL: 'all',
  COMPLETED: 'completed',
  UNCOMPLETED: 'uncompleted'
}

class ActiveTodosView extends Component {
  static propTypes = {
    uncompletedTodos: T.arrayOf(todoShape).isRequired,
    completedTodos: T.arrayOf(todoShape).isRequired,
    addTodo: T.func.isRequired,
  }

  state = {
    filter: filters.ALL,
  }

  handleAddTodo = name => {
    this.props.addTodo({
      name,
      id: uuid(),
    })
  }

  handleFilter = filter => {
    this.setState({
      filter
    })
  }

  render() {
    const { uncompletedTodos, completedTodos } = this.props
    const { filter } = this.state
    return (
      <Fragment>
        <Filters>
          Filters:
          <Filter isActive={filter === filters.ALL} onClick={() => this.handleFilter(filters.ALL)}>All</Filter>
          <Filter isActive={filter === filters.UNCOMPLETED} onClick={() => this.handleFilter(filters.UNCOMPLETED)}>Uncompleted</Filter>
          <Filter isActive={filter === filters.COMPLETED} onClick={() => this.handleFilter(filters.COMPLETED)}>Completed</Filter>
        </Filters>

        {(filter === filters.UNCOMPLETED || filter === filters.ALL) && (
         <Fragment>
           <ListHeader label="Uncompleted" />
           <UncompletedTodosList items={uncompletedTodos} />
           <AddTodoForm onAddTodo={this.handleAddTodo} />
         </Fragment>
        )}
        {(filter === filters.COMPLETED || filter === filters.ALL) && (
          <Fragment>
            <ListHeader label="Completed" />
            <CompletedTodosList items={completedTodos}/>
          </Fragment>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  uncompletedTodos: getUncompletedTodos(state),
  completedTodos: getCompletedTodos(state)
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TodosActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTodosView)
