import { AppState } from 'store/reducers'

export const getAuthorsRequestPending = (state: AppState): boolean =>
  state.authors.requestPending
