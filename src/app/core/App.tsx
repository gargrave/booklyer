import * as React from 'react'
import { Provider } from 'react-redux'

import store from 'store/store'

import { AppIndexContainer } from './AppIndex'

import './App.scss'

const App: React.FC = () => (
  <Provider store={store}>
    <AppIndexContainer />
  </Provider>
)

export default App
