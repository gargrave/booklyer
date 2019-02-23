import { useEffect, useState } from 'react'

import { auth } from 'config/firebase'
import { sanitizeUser } from './sanitizeUser'

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
    const unsub = auth.onAuthStateChanged(fbUser => {
      setUser(sanitizeUser(fbUser))
      if (waitForInitialization && !authInitialized) {
        setAuthInitialized(true)
      }
    })
    return unsub
  }, [])

  const logout = async () => {
    await auth.signOut()
  }

  return { authInitialized, getUser: () => user, logout, user }
}
