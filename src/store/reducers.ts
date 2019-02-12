import { combineReducers } from 'redux'

import auth, { AuthState } from 'app/auth/store/auth.reducers'
import authors, { AuthorsState } from 'app/authors/store/authors.reducers'
import books, { BooksState } from 'app/books/store/books.reducers'

export type AppState = {
  auth: AuthState
  authors: AuthorsState
  books: BooksState
}

export default combineReducers({ auth, authors, books })
