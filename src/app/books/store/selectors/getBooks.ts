import { createSelector } from 'reselect'
import pick from 'lodash/pick'

import { AppState } from 'store/reducers'
import { getAuthorById } from 'app/authors/store/selectors'
import { Book, BookPropertyNames } from '../../books.types'

const getState = (state: AppState): AppState => state

export const getBooks = createSelector(
  getState,
  state =>
    Object.values(state.books.data).map(book => {
      const author = getAuthorById(state, book.authorId)
      return {
        ...pick(book, BookPropertyNames),
        author,
      }
    }) as Book[],
)
