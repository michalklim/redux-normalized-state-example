import { ADD_TODO, DELETE_TODO, COMPLETE_TOGGLE_TODO, ARCHIVE_TOGGLE_TODO } from 'constants/ActionTypes'
import { createAction } from 'redux-actions'

export const addTodo = createAction(ADD_TODO)
export const deleteTodo = createAction(DELETE_TODO)
export const toggleCompleteTodo = createAction(COMPLETE_TOGGLE_TODO)
export const toggleArchiveTodo = createAction(ARCHIVE_TOGGLE_TODO)
