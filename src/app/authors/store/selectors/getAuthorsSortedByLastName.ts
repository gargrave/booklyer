import { createSelector } from 'reselect'

import { Author } from '../../authors.types'
import { getAuthors } from './getAuthors'

const sortByLastName = (a: Author, b: Author) =>
  a.lastName > b.lastName ? 1 : -1

export const getAuthorsSortedByLastName = createSelector(
  getAuthors,
  authors => authors.sort(sortByLastName),
)
