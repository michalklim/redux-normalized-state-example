import { createStore, applyMiddleware } from 'redux'
import rootReducer from 'reducers'

const middlewares = []
const enhancer = [applyMiddleware(...middlewares)]

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, ...enhancer)
}
