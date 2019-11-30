import * as React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import rootReducer from '../../store/reducers'

const store = createStore(rootReducer, {})

export const renderWithRedux = (children: React.ReactNode) => {
  return render(<Provider store={store}>{children}</Provider>)
}
