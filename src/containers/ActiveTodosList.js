import React, {Component, Fragment} from 'react'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { connect } from 'react-redux'
import T from 'prop-types'
import uuid from 'uuid/v4'

import { List, ListHeader, TodoItem, AddTodoForm } from 'components'
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

class ActiveTodosList extends Component {
  static propTypes = {
    uncompletedTodos: T.arrayOf(todoShape).isRequired,
    completedTodos: T.arrayOf(todoShape).isRequired,
    addTodo: T.func.isRequired,
    deleteTodo: T.func.isRequired,
    editTodo: T.func.isRequired,
    toggleCompleteTodo: T.func.isRequired,
    toggleArchiveTodo: T.func.isRequired,
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

  handleToggleComplete = id => {
    this.props.toggleCompleteTodo({id})
  }

  handleToggleArchive = id => {
    this.props.toggleArchiveTodo({id})
  }

  handleItemDelete = id => {
    this.props.deleteTodo({id})
  }

  handleItemEdit = (id, newName) => {
    this.props.editTodo({id, newName})
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
           <List items={uncompletedTodos}
                 itemComponent={TodoItem}
                 onItemToggleComplete={this.handleToggleComplete}
                 onItemDelete={this.handleItemDelete}
                 onItemEdit={this.handleItemEdit} />
           <AddTodoForm onAddTodo={this.handleAddTodo} />
         </Fragment>
        )}
        {(filter === filters.COMPLETED || filter === filters.ALL) && (
          <Fragment>
            <ListHeader label="Completed" />
            <List items={completedTodos}
                  itemComponent={TodoItem}
                  onItemToggleComplete={this.handleToggleComplete}
                  onItemToggleArchive={this.handleToggleArchive}
                  onItemDelete={this.handleItemDelete}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTodosList)
