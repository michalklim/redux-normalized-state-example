import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import T from 'prop-types'

import { ListHeader } from 'components'
import { ArchivedTodosList } from 'containers'
import { ARCHIVED } from 'constants/TodosStatuses'
import * as TodosActions from 'actions/todos'
import { getFilteredTodos } from 'reducers/todos'
import { todoShape } from 'constants/Shapes'

function ArchivedTodosView({todos}) {
    return (
      <Fragment>
        <ListHeader label="All Archived"/>
        <ArchivedTodosList items={todos} />
      </Fragment>
    )
}

const mapStateToProps = (state) => ({
  todos: getFilteredTodos(state, ARCHIVED)
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TodosActions, dispatch)
}

ArchivedTodosView.propTypes = {
  todos: T.arrayOf(todoShape).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchivedTodosView)
