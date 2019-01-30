import * as React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '../../store/store'

import Router from './Router'

import './App.scss'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <>
            <h1>Booklyer</h1>
            <nav>
              <Link to="/books">Books</Link> |{' '}
              <Link to="/authors">Authors</Link>
            </nav>
            <main>
              <Router />
            </main>
          </>
        </BrowserRouter>
      </Provider>
    )
  }
}
