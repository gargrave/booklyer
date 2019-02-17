import { useEffect, useState } from 'react'

import { auth } from 'config/firebase'
import { sanitizeUser } from './sanitizeUser'

const useAuthentication = () => {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(fbUser => {
      setUser(sanitizeUser(fbUser))
    })
    return unsub
  }, [])

  const logout = async () => {
    await auth.signOut()
  }

  return { logout, user }
}

export { useAuthentication }
