import { ADD_TODO, COMPLETE_TODO, ARCHIVE_TODO } from 'constants/ActionTypes'
import { createAction } from 'redux-actions'

export const addTodo = createAction(ADD_TODO)
export const completeTodo = createAction(COMPLETE_TODO)
export const archiveTodo = createAction(ARCHIVE_TODO)
