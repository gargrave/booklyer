import { combineReducers } from 'redux'

import authors, { IAuthorsState } from 'app/authors/store/reducers'
import books, { IBooksState } from 'app/books/store/reducers'

export interface IAppState {
  authors: IAuthorsState
  books: IBooksState
}

export default combineReducers({ authors, books })
