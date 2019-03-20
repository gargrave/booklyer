import { createSelector } from 'reselect'

import { AuthorsState } from '../authors.reducer'

const getRequestPending = (state: AuthorsState): boolean => state.requestPending

const getAuthorsRequestPending = createSelector(
  getRequestPending,
  pending => pending,
)

export default getAuthorsRequestPending
