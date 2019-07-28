import { createSelector } from 'reselect'
import pick from 'lodash/pick'

import { AppState } from 'store/reducers'
import { getAuthorById } from 'app/authors/store/selectors'
import { BookPropertyNames } from '../../books.types'

const getState = (state: AppState) => state
const getBookId = (state: AppState, id: string) => id

export const getBookById = createSelector(
  getState,
  getBookId,
  (state, id) => {
    const book = state.books.data[id]
    if (!book) return undefined

    const author = getAuthorById(state, book.authorId)

    return {
      ...pick(book, BookPropertyNames),
      author,
    }
  },
)
