import { AppState } from 'store/reducers'

export const getBooksRequestPending = (state: AppState): boolean =>
  state.books.requestPending
