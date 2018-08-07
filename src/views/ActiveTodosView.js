import React, {Component, Fragment} from 'react'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { connect } from 'react-redux'
import T from 'prop-types'
import uuid from 'uuid/v4'

import { ListHeader, AddTodoForm } from 'components'
import { UncompletedTodosList, CompletedTodosList } from 'containers'
import * as TodosActions from 'actions/todos'
import { getCompletedTodos, getUncompletedTodos } from 'reducers/todos'
import { todoShape } from 'constants/Shapes'
import { ms } from 'styles/helpers'

const Filters = styled.div`
  display: flex;
  text-transform: uppercase;
  align-items: center;
  padding: ${ms(-1)} ${ms(2)} 0;
  color: ${({theme: {colors}}) => colors.disabled};
  font-weight: ${({theme: {typo: {weights}}}) => weights.bold};
  font-size: ${ms(-1)};
`

const Filter = styled.button`
  background: none;
  border: none;
  padding: ${ms(-4)} ${ms(-6)};
  margin: 0 ${ms(-4)};
  text-transform: uppercase;
  font-family: ${({theme: {typo: {fonts}}}) => fonts.primary};
  color: ${({isActive, theme: {colors}}) => isActive ? colors.accent : colors.disabled};
  cursor: pointer;
`

const ALL = 'all'
const COMPLETED = 'completed'
const UNCOMPLETED = 'uncompleted'

const filters = {
  [ALL]: 'All',
  [COMPLETED]: 'Completed',
  [UNCOMPLETED]: 'Uncompleted'
}

class ActiveTodosView extends Component {
  static propTypes = {
    uncompletedTodos: T.arrayOf(todoShape).isRequired,
    completedTodos: T.arrayOf(todoShape).isRequired,
    addTodo: T.func.isRequired,
  }

  state = {
    filter: ALL,
  }

  handleAddTodo = name => {
    this.props.addTodo({
      name,
      id: uuid(),
    })
  }

  handleFilter = filter => {
    this.setState({
      filter
    })
  }

  render() {
    const { uncompletedTodos, completedTodos } = this.props
    const { filter } = this.state
    return (
      <Fragment>
        <Filters>
          Filters:
          {Object.keys(filters).map(filterKey => (
            <Filter key={filterKey} isActive={filter === filterKey} onClick={() => this.handleFilter(filterKey)}>{filters[filterKey]}</Filter>
          ))}
        </Filters>

        {(filter === UNCOMPLETED || filter === ALL) && (
         <Fragment>
           <ListHeader label="Uncompleted" />
           <UncompletedTodosList items={uncompletedTodos} />
           <AddTodoForm onAddTodo={this.handleAddTodo} />
         </Fragment>
        )}
        {(filter === COMPLETED || filter === ALL) && (
          <Fragment>
            <ListHeader label="Completed" />
            <CompletedTodosList items={completedTodos}/>
          </Fragment>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTodosView)
