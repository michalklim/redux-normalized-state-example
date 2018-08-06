import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'
import {withRouter} from 'react-router-dom'

import { List, TodoItem } from 'components'
import { ARCHIVED } from 'constants/TodosFilters'
import * as TodosActions from 'actions/todos'
import { getFilteredTodos } from 'reducers/todos'
import { todoShape } from 'constants/Shapes'

class ArchivedTodoList extends React.Component {
  static propTypes = {
    todos: T.arrayOf(todoShape).isRequired,
    deleteTodo: T.func.isRequired,
    toggleArchiveTodo: T.func.isRequired,
  }

  handleToggleArchive = id => {
    this.props.toggleArchiveTodo({id})
  }

  handleDelete = id => {
    this.props.deleteTodo({id})
  }

  render() {
    const { todos } = this.props

    return (
      <List items={todos} itemComponent={TodoItem} onItemToggleArchive={this.handleToggleArchive} onItemDelete={this.handleDelete} />
    )
  }
}

const mapStateToProps = (state) => ({
  todos: getFilteredTodos(state, ARCHIVED)
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TodosActions, dispatch)
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ArchivedTodoList)
