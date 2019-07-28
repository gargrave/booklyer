import { createSelector } from 'reselect'

import { AppState } from 'store/reducers'
import { Author } from '../../authors.types'

const getAllAuthors = (state: AppState): Author[] =>
  Object.values(state.authors.data)

export const getAuthors = createSelector(
  getAllAuthors,
  authors => authors,
)
