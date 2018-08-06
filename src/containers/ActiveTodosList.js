import React, {Component, Fragment} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'
import uuid from 'uuid/v4'

import { List, TodoItem } from 'components'
import * as TodosActions from 'actions/todos'
import { getCompletedTodos, getUncompletedTodos } from 'reducers/todos'
import { todoShape } from 'constants/Shapes'

class ActiveTodosList extends Component {
  static propTypes = {
    uncompletedTodos: T.arrayOf(todoShape).isRequired,
    completedTodos: T.arrayOf(todoShape).isRequired,
    addTodo: T.func.isRequired,
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

  render() {
    const { uncompletedTodos, completedTodos } = this.props
    const {todoName} = this.state

    return (
      <Fragment>
        uncompleted
        <List items={uncompletedTodos} itemComponent={TodoItem} onItemToggleComplete={this.handleToggleComplete} onItemToggleArchive={this.handleToggleArchive} />
        <form onSubmit={this.handleSubmit}>

          <input type="text" name="name" value={todoName} onChange={this.handleInputChange} />
          <input type="submit" value="Submit" />
        </form>

        completed
        <List items={completedTodos} itemComponent={TodoItem} onItemToggleComplete={this.handleToggleComplete} onItemToggleArchive={this.handleToggleArchive}/>
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
