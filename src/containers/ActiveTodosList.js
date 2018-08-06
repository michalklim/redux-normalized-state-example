import React, {Component, Fragment} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'
import uuid from 'uuid/v4'

import { List, ListHeader, TodoItem, AddTodoForm } from 'components'
import * as TodosActions from 'actions/todos'
import { getCompletedTodos, getUncompletedTodos } from 'reducers/todos'
import { todoShape } from 'constants/Shapes'

class ActiveTodosList extends Component {
  static propTypes = {
    uncompletedTodos: T.arrayOf(todoShape).isRequired,
    completedTodos: T.arrayOf(todoShape).isRequired,
    addTodo: T.func.isRequired,
    deleteTodo: T.func.isRequired,
    toggleCompleteTodo: T.func.isRequired,
    toggleArchiveTodo: T.func.isRequired,
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

  render() {
    const { uncompletedTodos, completedTodos } = this.props

    return (
      <Fragment>
        <ListHeader label="Uncompleted" />
        <List items={uncompletedTodos} itemComponent={TodoItem} onItemToggleComplete={this.handleToggleComplete} onItemDelete={this.handleItemDelete} />
        <AddTodoForm onAddTodo={this.handleAddTodo} />

        <ListHeader label="Completed" />
        <List items={completedTodos} itemComponent={TodoItem} onItemToggleComplete={this.handleToggleComplete} onItemToggleArchive={this.handleToggleArchive} onItemDelete={this.handleItemDelete}/>
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
