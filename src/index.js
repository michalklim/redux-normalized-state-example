import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {ThemeProvider} from 'styled-components'
import debounce from 'lodash/debounce'

import configureStore from 'store'
import Routes from 'routes'
import 'styles/global-styles'
import theme from 'styles/theme'
import { loadTodos, saveTodos } from 'services/localStorageService'
import registerServiceWorker from 'utils/registerServiceWorker'

const persistedState = {
  todos: loadTodos()
}

const store = configureStore(persistedState)

store.subscribe(debounce(() => {
  saveTodos(store.getState().todos)
}), 1000)

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
