import { combineReducers } from 'redux'

import { ACTIVE, ARCHIVED } from 'constants/TodosStatuses'
import { ADD_TODO, DELETE_TODO, COMPLETE_TOGGLE_TODO, ARCHIVE_TOGGLE_TODO, SEARCH_TODO, EDIT_TODO } from 'constants/ActionTypes'

const todo = (state = {}, {type, payload}) => {
  switch (type) {
    case ADD_TODO: {
      return {
        isCompleted: false,
        status: ACTIVE,
        ...payload
      }
    }
    case EDIT_TODO: {
      return {
        ...state,
        name: payload.newName,
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
    case EDIT_TODO:
    case ARCHIVE_TOGGLE_TODO: {
      return {
        ...state,
        [payload.id]: todo(state[payload.id], {type, payload})
      }
    }
    case DELETE_TODO: {
      return Object.keys(state).reduce((acc, key) => {
        if (key !== payload.id) {
          acc[key] = state[key]
        }

        return acc
      }, {})
    }
    default:
      return state
  }
}

const allIds = (state = [], {type, payload}) => {
  switch (type) {
    case ADD_TODO: {
      return [...state, payload.id]
    }
    case DELETE_TODO: {
      return state.filter(id => id !== payload.id)
    }
    default:
      return state
  }
}

const searchedIds = (state = [], {type, payload}) => {
  switch (type) {
    case SEARCH_TODO: {
      return [...payload]
    }
    default:
      return state
  }
}

const todos = combineReducers({
  allIds,
  searchedIds,
  byId,
})

export const getAllTodos = state => state.todos.allIds.map(id => state.todos.byId[id])

export const getFilteredTodos = (state, status) =>
  getAllTodos(state)
  .filter(singleTodo => singleTodo.status === status)

export const getUncompletedTodos = (state, filter = ACTIVE) =>
  getFilteredTodos(state, filter)
    .filter(filteredTodo => !filteredTodo.isCompleted)

export const getCompletedTodos = (state, filter = ACTIVE) =>
  getFilteredTodos(state, filter)
    .filter(filteredTodo => filteredTodo.isCompleted)

export const getSearchedTodos = state => state.todos.searchedIds.map(id => state.todos.byId[id])

export default todos
