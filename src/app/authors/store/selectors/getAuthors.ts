import { createSelector } from 'reselect'

import { Author } from '../../authors.types'
import { AuthorsState } from '../authors.reducer'

const getAllAuthors = (state: AuthorsState): Author[] =>
  Object.values(state.data)

const getAuthors = createSelector(
  getAllAuthors,
  authors => authors,
)

export default getAuthors
