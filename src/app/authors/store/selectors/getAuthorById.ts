import { createSelector } from 'reselect'
import pick from 'lodash/pick'

import { AuthorsState } from '../authors.reducers'
import { Author, AuthorPropertyNames } from '../../authors.types'

const rawGetAuthorById = (
  state: AuthorsState,
  id?: string,
): Author | undefined => {
  if (!id) {
    return undefined
  }

  const author = state.data[id]
  return author && { ...pick(author, AuthorPropertyNames) }
}

const getAuthorById = createSelector(
  rawGetAuthorById,
  author => author,
)

export default getAuthorById
