import { useEffect, useState } from 'react'

import { auth } from 'config/firebase'
import { sanitizeUser } from './sanitizeUser'

import { User } from '../auth.types'

export type AuthenticationOptions = {
  waitForInitialization: boolean
}

export const useAuthentication = (
  options: AuthenticationOptions = {} as AuthenticationOptions,
) => {
  const [authInitialized, setAuthInitialized] = useState(false)
  const [user, setUser] = useState<any>(sanitizeUser(auth.currentUser))

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

  const logout = () => {
    auth.signOut()
  }

  return { authInitialized, logout, getUser: (): User => user }
}
