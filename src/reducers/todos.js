import { combineReducers } from 'redux'
import { ACTIVE, ARCHIVED } from 'constants/TodosFilters'

import { ADD_TODO, COMPLETE_TOGGLE_TODO, ARCHIVE_TOGGLE_TODO } from 'constants/ActionTypes'

const todo = (state = {}, {type, payload}) => {
  switch (type) {
    case ADD_TODO: {
      return {
        isCompleted: false,
        status: ACTIVE,
        ...payload
      }
    }
    case COMPLETE_TOGGLE_TODO: {
      return {
        ...state,
        isCompleted: !state.isCompleted,
      }
    }
    case ARCHIVE_TOGGLE_TODO: {
      return {
        ...state,
        status: state.status === ACTIVE ? ARCHIVED : ACTIVE,
      }
    }

    default:
      return state
  }
}

const byId = (state = {}, {type, payload}) => {
  switch (type) {
    case ADD_TODO:
    case COMPLETE_TOGGLE_TODO:
    case ARCHIVE_TOGGLE_TODO: {
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
