import * as React from 'react'

import { User } from 'app/auth/auth.types'

export interface IAppContext {
  appInitialized: boolean
  user?: User
}

export const initialAppContextState: IAppContext = Object.freeze({
  appInitialized: false,
  user: undefined,
})

export const AppContext = React.createContext(initialAppContextState)
