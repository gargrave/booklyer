import { createSelector } from 'reselect'

import { AppState } from 'store/reducers'
import { Book } from 'app/books/books.types'

import getBooksWithAuthors from './getBooksWithAuthors'
import { sortByCustomOrTitle } from './utils'

const rawGetBooksByAuthor = (state: AppState, authorId?: string): Book[] => {
  if (!authorId) {
    return []
  }
  return getBooksWithAuthors(state)
    .filter(book => book.author.id === authorId)
    .sort(sortByCustomOrTitle)
}

const getBooksByAuthor = createSelector(
  rawGetBooksByAuthor,
  books => books,
)

export default getBooksByAuthor
