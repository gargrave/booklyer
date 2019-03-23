import { createSelector } from 'reselect'

import { AuthorsState } from '../authors.reducer'
import { Author, AuthorBucket } from '../../authors.types'

const getAllAuthors = (state: AuthorsState): Author[] =>
  Object.values(state.data)

const sortByLastName = (a: Author, b: Author) =>
  a.lastName > b.lastName ? 1 : -1

const getBucketedAuthors = createSelector(
  getAllAuthors,
  authors => {
    const sortedAuthors = authors.sort(sortByLastName)
    const mappedAuthors = {}

    sortedAuthors.forEach(author => {
      const lastInitial = author.lastName[0]
      if (!(lastInitial in mappedAuthors)) {
        mappedAuthors[lastInitial] = []
      }
      mappedAuthors[lastInitial].push(author)
    })

    return Object.keys(mappedAuthors).reduce(
      (accum, key): AuthorBucket[] => {
        return accum.concat({
          key,
          authors: mappedAuthors[key],
        })
      },
      [] as AuthorBucket[],
    )
  },
)

export default getBucketedAuthors
