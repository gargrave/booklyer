import * as React from 'react'

import { User } from 'app/auth/auth.types'

export interface IAppContext {
  appInitialized: boolean
  logout: () => void
  user?: User
}

export const initialAppContextState: IAppContext = Object.freeze({
  appInitialized: false,
  logout: () => void 0,
  user: undefined,
})

export const AppContext = React.createContext(initialAppContextState)
