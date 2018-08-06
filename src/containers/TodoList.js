import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'
import uuid from 'uuid/v4'
import {withRouter} from 'react-router-dom'

import { List, TodoItem } from 'components'
import * as TodosActions from 'actions/todos'
import { getFilteredTodos } from 'reducers/todos'
import { todoShape } from 'constants/Shapes'

class TodoList extends React.Component {
  static propTypes = {
    todos: T.arrayOf(todoShape).isRequired,
    addTodo: T.func.isRequired,
    completeTodo: T.func.isRequired,
    archiveTodo: T.func.isRequired,
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

  handleItemComplete = id => {
    this.props.completeTodo({id})
  }

  handleItemArchive = id => {
    this.props.archiveTodo({id})
  }

  render() {
    const { todos } = this.props
    const {todoName} = this.state

    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <input type="text" name="name" value={todoName} onChange={this.handleInputChange} />
          <input type="submit" value="Submit" />
        </form>
        <List items={todos} itemComponent={TodoItem} onItemComplete={this.handleItemComplete} onItemArchive={this.handleItemArchive} />
      </div>
    )
  }
}

const mapStateToProps = (state, {match: {params: {todosFilter}}}) => ({
  todos: getFilteredTodos(state, todosFilter)
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TodosActions, dispatch)
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(TodoList)
