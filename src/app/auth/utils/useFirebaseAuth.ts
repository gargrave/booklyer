import { useCallback, useEffect, useState } from 'react'

import { auth } from 'config/firebase'
import { sanitizeUser } from './sanitizeUser'

export type AuthenticationOptions = {
  waitForInitialization: boolean
}

export const useFirebaseAuth = (
  options: AuthenticationOptions = {} as AuthenticationOptions, // eslint-disable-line
) => {
  const [authInitialized, setAuthInitialized] = useState(false)
  const [user, setUser] = useState<any>(sanitizeUser(auth.currentUser)) // eslint-disable-line

  const { waitForInitialization } = options

  useEffect(() => {
    let hasUnsubbed = false

    const unsub = auth.onAuthStateChanged(fbUser => {
      if (!hasUnsubbed) {
        setUser(sanitizeUser(fbUser))
        if (waitForInitialization && !authInitialized) {
          setAuthInitialized(true)
        }
      }
    })

    return () => {
      hasUnsubbed = true
      unsub()
    }
  }, [])

  const logout = useCallback(() => {
    auth.signOut()
  }, [])

  return { authInitialized, logout, user }
}
