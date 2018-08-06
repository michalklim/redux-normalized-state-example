import { combineReducers } from 'redux'
import { ACTIVE, ARCHIVED } from 'constants/TodosFilters'

import { ADD_TODO, COMPLETE_TODO, ARCHIVE_TODO } from 'constants/ActionTypes'

const todo = (state = {}, {type, payload}) => {
  switch (type) {
    case ADD_TODO: {
      return {
        isCompleted: false,
        status: ACTIVE,
        ...payload
      }
    }
    case COMPLETE_TODO: {
      return {
        ...state,
        isCompleted: true,
      }
    }
    case ARCHIVE_TODO: {
      return {
        ...state,
        status: ARCHIVED,
      }
    }

    default:
      return state
  }
}

const byId = (state = {}, {type, payload}) => {
  switch (type) {
    case ADD_TODO:
    case COMPLETE_TODO:
    case ARCHIVE_TODO: {
      return {
        ...state,
        [payload.id]: todo(state[payload.id], {type, payload})
      }
    }
    default:
      return state
  }
}

const allIds = (state = [], {type, payload}) => {
  switch (type) {
    case ADD_TODO: {
      return [payload.id, ...state]
    }
    default:
      return state
  }
}

const todos = combineReducers({
  byId,
  allIds
})

export const getFilteredTodos = (state, filter) => {
  const allTodos = state.todos.allIds.map(id => state.todos.byId[id])

  return allTodos.filter(singleTodo => singleTodo.status === filter )
}

export default todos
