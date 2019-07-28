import { createSelector } from 'reselect'

import { bucketizer } from 'utils/bucketizer'

import { Author } from '../../authors.types'
import { getAuthors } from './getAuthors'

const sortByLastName = (a: Author, b: Author) =>
  a.lastName > b.lastName ? 1 : -1

export const getBucketedAuthors = createSelector(
  getAuthors,
  authors =>
    bucketizer(authors, sortByLastName, (author: Author) => author.lastName[0]),
)
