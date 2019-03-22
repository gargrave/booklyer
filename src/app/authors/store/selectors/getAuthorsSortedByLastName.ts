import { createSelector } from 'reselect'

import { Author } from '../../authors.types'
import { AuthorsState } from '../authors.reducer'

const getAllAuthors = (state: AuthorsState): Author[] =>
  Object.values(state.data)

const sortByLastName = (a: Author, b: Author) =>
  a.lastName > b.lastName ? 1 : -1

const getAuthorsSortedByLastName = createSelector(
  getAllAuthors,
  authors => authors.sort(sortByLastName),
)

export default getAuthorsSortedByLastName
