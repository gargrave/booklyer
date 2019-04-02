import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import has from 'lodash/has'

import { User } from 'app/auth/auth.types'
import { useFirebaseAuth } from 'app/auth/utils'
import { AppContext, initialAppContextState, IAppContext } from './App.context'

import Navbar from '../components/Navbar/Navbar'
import Titlebar from '../components/Titlebar/Titlebar'
import Router from '../Router'

import styles from './AppIndex.module.scss'

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

export type AppIndexProps = {
  fetchBooks: (owerId: string) => Promise<any>
  setLocalUserData: (user: User) => void
}

const AppIndex: React.FunctionComponent<AppIndexProps> = ({
  fetchBooks,
  setLocalUserData,
}) => {
  const { authInitialized, logout, user } = useFirebaseAuth({
    waitForInitialization: true,
  })
  const [appContextState, setAppContextState] = React.useState<IAppContext>(
    initialAppContextState,
  )

  React.useEffect(() => {
    if (authInitialized) {
      setLocalUserData(user)
      if (has(user, 'id')) {
        fetchBooks(user.id)
      }
      setAppContextState({ logout, user, appInitialized: true })
    }
  }, [authInitialized, user])

  return (
    <BrowserRouter>
      <AppContext.Provider value={appContextState}>
        <Titlebar title="Bookly" />
        <AuthContent authInitialized={authInitialized} />
      </AppContext.Provider>
    </BrowserRouter>
  )
}

export default React.memo(AppIndex)
