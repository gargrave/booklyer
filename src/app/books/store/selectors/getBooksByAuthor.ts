import { createSelector } from 'reselect'

import { AppState } from 'store/reducers'
import { sortByCustomOrTitle } from './utils'

import { getBooks } from './getBooks'

const getState = (state: AppState): AppState => state
const getAuthorId = (_state: AppState, id: string): string => id

export const getBooksByAuthor = createSelector(
  getState,
  getAuthorId,
  (state, authorId) =>
    getBooks(state)
      .filter(book => book.author.id === authorId)
      .sort(sortByCustomOrTitle),
)
