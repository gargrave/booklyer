import * as React from 'react'

import { User } from 'app/auth/auth.types'
import { useAuthentication } from 'app/auth/utils/useAuthentication'

import Navbar from '../components/Navbar/Navbar'
import Titlebar from '../components/Titlebar/Titlebar'
import Router from '../Router'

import styles from './AppIndex.module.scss'
import { BrowserRouter } from 'react-router-dom'

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

export type AppProps = {
  getUser: () => User
  setLocalUserData: (user: User) => void
}

const AppIndex: React.FunctionComponent<AppProps> = ({
  getUser,
  setLocalUserData,
}) => {
  const { authInitialized, user } = useAuthentication({
    waitForInitialization: true,
  })

  // once initialized, check if we have a user from a previous session, and if so, store it in Redux
  React.useEffect(() => {
    if (authInitialized && user) {
      const storedUser = getUser()
      if (!storedUser || !storedUser.id) {
        setLocalUserData(user)
      }
    }
  }, [authInitialized])

  return (
    <BrowserRouter>
      <>
        <Titlebar title="Booklyer" />
        <AuthContent authInitialized={authInitialized} />
      </>
    </BrowserRouter>
  )
}

export default React.memo(AppIndex)
