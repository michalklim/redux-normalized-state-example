import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'

import { ListHeader } from 'components'
import { UncompletedTodosList, CompletedTodosList, ArchivedTodosList} from 'containers'
import { ACTIVE, ARCHIVED } from 'constants/TodosStatuses'
import * as TodosActions from 'actions/todos'
import { getSearchedTodos } from 'reducers/todos'
import { todoShape } from 'constants/Shapes'

function SearchTodosView({uncompletedTodos, completedTodos, archivedTodos }) {
    return (
      <Fragment>
        <ListHeader label="Uncompleted"/>
        <UncompletedTodosList items={uncompletedTodos} />

        <ListHeader label="Completed"/>
        <CompletedTodosList items={completedTodos} />

        <ListHeader label="Archived"/>
        <ArchivedTodosList items={archivedTodos} />
      </Fragment>
    )
}

const mapStateToProps = (state) => ({
  uncompletedTodos: getSearchedTodos(state).filter(todo => todo.status === ACTIVE && !todo.isCompleted),
  completedTodos: getSearchedTodos(state).filter(todo => todo.status === ACTIVE && todo.isCompleted),
  archivedTodos: getSearchedTodos(state).filter(todo => todo.status === ARCHIVED),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TodosActions, dispatch)
}

SearchTodosView.propTypes = {
  uncompletedTodos: T.arrayOf(todoShape).isRequired,
  completedTodos: T.arrayOf(todoShape).isRequired,
  archivedTodos: T.arrayOf(todoShape).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTodosView)
