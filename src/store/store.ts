/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

interface IWindowWithDevTools extends Window {
  __REDUX_DEVTOOLS_EXTENSION__: any
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    typeof window === 'object' &&
      typeof (window as IWindowWithDevTools).__REDUX_DEVTOOLS_EXTENSION__ !==
        'undefined'
      ? (window as IWindowWithDevTools).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f,
  ),
)

export default store
