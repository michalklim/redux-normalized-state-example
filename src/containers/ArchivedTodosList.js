import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'

import { List, TodoItem } from 'components'
import * as TodosActions from 'actions/todos'
import { todoShape } from 'constants/Shapes'

class ArchivedTodosList extends React.Component {
  static propTypes = {
    items: T.arrayOf(todoShape).isRequired,
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
    const { items } = this.props

    return (
       <List items={items}
             itemComponent={TodoItem}
             onItemToggleArchive={this.handleToggleArchive}
             onItemDelete={this.handleDelete} />
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(TodosActions, dispatch)
}

export default connect(null, mapDispatchToProps)(ArchivedTodosList)
