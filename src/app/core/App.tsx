import * as React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '../../store/store'

import Navbar from './components/Navbar/Navbar'
import Titlebar from './components/Titlebar/Titlebar'
import Router from './Router'

import styles from './App.module.scss'
import './App.scss'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <>
            <Titlebar title="Booklyer" />
            <Navbar />
            <main className={styles.main}>
              <Router />
            </main>
          </>
        </BrowserRouter>
      </Provider>
    )
  }
}
