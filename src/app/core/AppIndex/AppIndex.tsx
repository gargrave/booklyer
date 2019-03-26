import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { User } from 'app/auth/auth.types'
import { useAuthentication } from 'app/auth/utils/useAuthentication'

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

export type AppProps = {
  fetchBooks: (owerId: string) => Promise<any>
  setLocalUserData: (user: User) => void
}

const AppIndex: React.FunctionComponent<AppProps> = ({
  fetchBooks,
  setLocalUserData,
}) => {
  const { authInitialized, getUser } = useAuthentication({
    waitForInitialization: true,
  })
  const user = getUser()

  React.useEffect(() => {
    if (authInitialized) {
      setLocalUserData(user)
      if (user) {
        fetchBooks(user.id)
      }
    }
  }, [authInitialized, user])

  return (
    <BrowserRouter>
      <>
        <Titlebar title="Bookly" />
        <AuthContent authInitialized={authInitialized} />
      </>
    </BrowserRouter>
  )
}

export default React.memo(AppIndex)
