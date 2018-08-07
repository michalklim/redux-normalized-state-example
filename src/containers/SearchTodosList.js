import React, { Fragment } from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'
import {withRouter} from 'react-router-dom'

import { List, TodoItem, ListHeader } from 'components'
import { ACTIVE, ARCHIVED } from 'constants/TodosStatuses'
import * as TodosActions from 'actions/todos'
import { getSearchedTodos } from 'reducers/todos'
import { todoShape } from 'constants/Shapes'

class SearchTodosList extends React.Component {
  static propTypes = {
    uncompletedTodos: T.arrayOf(todoShape).isRequired,
    completedTodos: T.arrayOf(todoShape).isRequired,
    archivedTodos: T.arrayOf(todoShape).isRequired,
    deleteTodo: T.func.isRequired,
    editTodo: T.func.isRequired,
    toggleCompleteTodo: T.func.isRequired,
    toggleArchiveTodo: T.func.isRequired,
  }

  handleToggleArchive = id => {
    this.props.toggleArchiveTodo({id})
  }

  handleDelete = id => {
    this.props.deleteTodo({id})
  }

  handleToggleComplete = id => {
    this.props.toggleCompleteTodo({id})
  }

  handleItemEdit = (id, newName) => {
    this.props.editTodo({id, newName})
  }

  render() {
    const { uncompletedTodos, completedTodos, archivedTodos } = this.props

    return (
      <Fragment>
        <ListHeader label="Uncompleted"/>
        <List items={uncompletedTodos} itemComponent={TodoItem} onItemDelete={this.handleDelete} onItemToggleComplete={this.handleToggleComplete} onItemEdit={this.handleItemEdit} />

        <ListHeader label="Completed"/>
        <List items={completedTodos} itemComponent={TodoItem} onItemToggleArchive={this.handleToggleArchive} onItemDelete={this.handleDelete} onItemToggleComplete={this.handleToggleComplete} />

        <ListHeader label="Archived"/>
        <List items={archivedTodos} itemComponent={TodoItem} onItemToggleArchive={this.handleToggleArchive} onItemDelete={this.handleDelete} />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  uncompletedTodos: getSearchedTodos(state).filter(todo => todo.status === ACTIVE && !todo.isCompleted),
  completedTodos: getSearchedTodos(state).filter(todo => todo.status === ACTIVE && todo.isCompleted),
  archivedTodos: getSearchedTodos(state).filter(todo => todo.status === ARCHIVED),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TodosActions, dispatch)
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(SearchTodosList)
