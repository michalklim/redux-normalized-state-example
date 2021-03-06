import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'

import { List, TodoItem } from 'components'
import * as TodosActions from 'actions/todos'
import { todoShape } from 'constants/Shapes'

class CompletedTodosList extends Component {
  static propTypes = {
    items: T.arrayOf(todoShape).isRequired,
    deleteTodo: T.func.isRequired,
    toggleArchiveTodo: T.func.isRequired,
    toggleCompleteTodo: T.func.isRequired,
  }

  handleToggleComplete = id => {
    this.props.toggleCompleteTodo({id})
  }

  handleItemDelete = id => {
    this.props.deleteTodo({id})
  }

  handleToggleArchive = id => {
    this.props.toggleArchiveTodo({id})
  }

  render() {
    const { items } = this.props
    return (
      <List items={items}
            itemComponent={TodoItem}
            onItemToggleComplete={this.handleToggleComplete}
            onItemDelete={this.handleItemDelete}
            onItemToggleArchive={this.handleToggleArchive} />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TodosActions, dispatch)
}

export default connect(null, mapDispatchToProps)(CompletedTodosList)
