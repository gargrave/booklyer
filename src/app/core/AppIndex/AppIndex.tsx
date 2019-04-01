import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import has from 'lodash/has'

import { User } from 'app/auth/auth.types'
import { useFirebaseAuth } from 'app/auth/utils'
import { useAuthentication } from 'app/auth/utils/useAuthentication'
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
  const { authInitialized: fbAuthInitialized, user: fbUser } = useFirebaseAuth({
    waitForInitialization: true,
  })
  const { authInitialized, getUser } = useAuthentication({
    waitForInitialization: true,
  })

  const [appContextState, setAppContextState] = React.useState<IAppContext>(
    initialAppContextState,
  )

  React.useEffect(() => {
    if (fbAuthInitialized) {
      setLocalUserData(fbUser)
      if (has(fbUser, 'id')) {
        fetchBooks(fbUser.id)
      }
      setAppContextState({ appInitialized: true, user: fbUser })
    }
  }, [fbAuthInitialized, fbUser])

  const user = getUser()

  React.useEffect(() => {
    if (authInitialized) {
      setLocalUserData(user)
      if (has(user, 'id')) {
        fetchBooks(user.id)
      }
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
