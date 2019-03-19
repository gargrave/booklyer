import { createSelector } from 'reselect'

import { AuthState } from '../auth.reducer'

const getRequestPending = (state: AuthState): boolean => state.requestPending

const getAuthRequestPending = createSelector(
  getRequestPending,
  pending => pending,
)

export default getAuthRequestPending
