import { combineReducers } from 'redux'

import authors, { AuthorsState } from 'app/authors/store/reducers'
import books, { BooksState } from 'app/books/store/reducers'

export type AppState = {
  authors: AuthorsState
  books: BooksState
}

export default combineReducers({ authors, books })
