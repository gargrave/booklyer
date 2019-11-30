import * as React from 'react'
import { render } from '@testing-library/react'

import { AppContext } from 'app/core/AppIndex/App.context'

export const defaultAppContext = {
  appInitialized: false,
  logout: jest.fn(),
  user: undefined,
}

export const wrapInAppContext = (children, overrideContext = {}) => (
  <AppContext.Provider value={{ ...defaultAppContext, ...overrideContext }}>
    {children}
  </AppContext.Provider>
)

export const renderWithAppContext = (children, overrideContext = {}) =>
  render(wrapInAppContext(children, overrideContext))
