import { createSelector } from 'reselect'

import { BooksState } from '../books.reducer'

const getRequestPending = (state: BooksState): boolean => state.requestPending

const getBooksRequestPending = createSelector(
  getRequestPending,
  pending => pending,
)

export default getBooksRequestPending
