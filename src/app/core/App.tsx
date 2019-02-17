import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '../../store/store'
import { useAuthentication } from 'app/auth/utils/useAuthentication'

import Navbar from './components/Navbar/Navbar'
import Titlebar from './components/Titlebar/Titlebar'
import Router from './Router'

import styles from './App.module.scss'
import './App.scss'

const AuthContent = ({ authInitialized }) => {
  if (!authInitialized) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Router />
      </main>
    </>
  )
}

const App: React.FunctionComponent = () => {
  const { authInitialized } = useAuthentication({ waitForInitialization: true })

  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <Titlebar title="Booklyer" />
          <AuthContent authInitialized={authInitialized} />
        </>
      </BrowserRouter>
    </Provider>
  )
}

export default App
