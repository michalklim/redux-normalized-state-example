import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'
import uuid from 'uuid/v4'
import {withRouter} from 'react-router-dom'
import sortBy from 'lodash/sortBy'

import { List, TodoItem } from 'components'
import * as TodosActions from 'actions/todos'
import { getFilteredTodos } from 'reducers/todos'
import { todoShape } from 'constants/Shapes'

class TodoList extends React.Component {
  static propTypes = {
    todos: T.arrayOf(todoShape).isRequired,
    addTodo: T.func.isRequired,
    deleteTodo: T.func.isRequired,
    toggleCompleteTodo: T.func.isRequired,
    toggleArchiveTodo: T.func.isRequired,
  }

  state = {
    todoName: '',
  }

  handleInputChange = e => {
    this.setState({
      todoName: e.target.value
    })
  }

  handleSubmit = e => {
    this.props.addTodo({
      name: this.state.todoName,
      id: uuid(),
    })
    e.preventDefault();
  }

  handleToggleComplete = id => {
    this.props.toggleCompleteTodo({id})
  }

  handleToggleArchive = id => {
    this.props.toggleArchiveTodo({id})
  }

  handleDelete = id => {
    this.props.deleteTodo({id})
  }

  render() {
    const { todos } = this.props
    const {todoName} = this.state

    return (
      <div>
        <List items={todos} itemComponent={TodoItem} onItemToggleComplete={this.handleToggleComplete} onItemToggleArchive={this.handleToggleArchive} onItemDelete={this.handleDelete} />
        <form onSubmit={this.handleSubmit}>

          <input type="text" name="name" value={todoName} onChange={this.handleInputChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, {match: {params: {todosFilter}}}) => ({
  todos: sortBy(getFilteredTodos(state, todosFilter), item => item.isCompleted)
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TodosActions, dispatch)
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(TodoList)
