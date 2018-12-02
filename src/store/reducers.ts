import { combineReducers } from 'redux'

import authors, { IAuthorsState } from 'app/authors/store/reducers'

export interface IAppState {
  authors: IAuthorsState
}

export default combineReducers({ authors })
