import * as React from 'react'
import has from 'lodash/has'

import { AppContext } from './App.context'

import Navbar from '../components/Navbar/Navbar'
import Titlebar from '../components/Titlebar/Titlebar'
import Router from '../Router'

import styles from './AppContent.module.scss'
import { BrowserRouter } from 'react-router-dom'

export type AppContentProps = {
  fetchBooks: (owerId: string) => Promise<any>
}

const AppContent: React.FunctionComponent<AppContentProps> = ({
  fetchBooks,
}) => {
  const { appInitialized, user } = React.useContext(AppContext)

  React.useEffect(() => {
    // once app is initialized, if we are logged in, make the initial data fetch requests
    if (appInitialized && has(user, 'id')) {
      fetchBooks(user!.id)
    }
  }, [appInitialized, user])

  return (
    <BrowserRouter>
      <>
        <Titlebar title="Bookly" />
        {appInitialized ? (
          <>
            <Navbar />
            <main className={styles.main}>
              <Router />
            </main>
          </>
        ) : (
          <div className={styles.loading}>Loading...</div>
        )}
      </>
    </BrowserRouter>
  )
}

export default React.memo(AppContent)
