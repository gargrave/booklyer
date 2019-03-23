import { createSelector } from 'reselect'

import { bucketizer } from 'utils/bucketizer'

import { AuthorsState } from '../authors.reducer'
import { Author } from '../../authors.types'

const getAllAuthors = (state: AuthorsState): Author[] =>
  Object.values(state.data)

const sortByLastName = (a: Author, b: Author) =>
  a.lastName > b.lastName ? 1 : -1

const getBucketedAuthors = createSelector(
  getAllAuthors,
  allAuthors =>
    bucketizer(
      allAuthors,
      sortByLastName,
      (author: Author) => author.lastName[0],
    ),
)

export default getBucketedAuthors
