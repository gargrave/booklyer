import { combineReducers } from 'redux'

import { authReducer, AuthState } from 'app/auth/store/auth.reducer'
import { authorsReducer, AuthorsState } from 'app/authors/store/authors.reducer'
import { booksReducer, BooksState } from 'app/books/store/books.reducer'

export type AppState = {
  auth: AuthState
  authors: AuthorsState
  books: BooksState
}

export default combineReducers({
  auth: authReducer,
  authors: authorsReducer,
  books: booksReducer,
})
