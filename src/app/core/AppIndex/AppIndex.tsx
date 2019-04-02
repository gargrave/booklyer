import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { User } from 'app/auth/auth.types'
import { useFirebaseAuth } from 'app/auth/utils'
import { AppContext, initialAppContextState, IAppContext } from './App.context'

import AppContent from './AppContent'

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

  // state for storing and passing firebase values into context
  const [appContextState, setAppContextState] = React.useState<IAppContext>(
    initialAppContextState,
  )

  React.useEffect(() => {
    // once FB auth has initialized, update the Context with the current auth state
    if (authInitialized) {
      setLocalUserData(user)
      setAppContextState({ logout, user, appInitialized: true })
    }
  }, [authInitialized, user])

  return (
    <AppContext.Provider value={appContextState}>
      <AppContent fetchBooks={fetchBooks} />
    </AppContext.Provider>
  )
}

/**
 * Wrapper component to initialize auth state and set up the app-level context. Note that most of the app's
 * actual rendering happens in the `AppContent` component--these were split into separate components to make
 * testing easier (i.e. no need to try to mock the `useFirebaseAuth` behavior to test conditional rendering).
 */
export default React.memo(AppIndex)
