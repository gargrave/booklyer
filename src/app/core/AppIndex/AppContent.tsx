import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import has from 'lodash/has'

import { AppContext } from './App.context'

import Navbar from '../components/Navbar/Navbar'
import { TitleBar } from '../components'
import Router from '../Router'

import styles from './AppContent.module.scss'

export type AppContentProps = {
  fetchBooks: (ownerId: string) => Promise<void>
}

const AppContent: React.FunctionComponent<AppContentProps> = ({
  fetchBooks,
}) => {
  const { appInitialized, user } = React.useContext(AppContext)

  React.useEffect(() => {
    // once app is initialized, if we are logged in, make the initial data fetch requests
    if (appInitialized && has(user, 'id')) {
      user && fetchBooks(user.id)
    }
  }, [appInitialized, user]) // eslint-disable-line

  return (
    <BrowserRouter>
      <>
        <TitleBar title="Bookly" />
        {appInitialized ? (
          <>
            <Navbar />
            <div className={styles.appWrapper}>
              <main className={styles.appContent}>
                <Router />
              </main>
            </div>
          </>
        ) : (
          <div className={styles.loading}>Loading...</div>
        )}
      </>
    </BrowserRouter>
  )
}

export default React.memo(AppContent)
