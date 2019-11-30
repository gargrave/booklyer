/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    typeof window === 'object' &&
    typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f,
  ),
)

if (process.env.NODE_ENV === 'development') {
  const _window = window as any
  _window.store = store
}

export default store
