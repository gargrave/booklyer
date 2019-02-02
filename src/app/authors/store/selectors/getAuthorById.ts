import pick from 'lodash/pick'

import { AuthorsState } from '../authors.reducers'
import { Author, AuthorPropertyNames } from '../../authors.types'

const getAuthorById = (
  state: AuthorsState,
  id?: string,
): Author | undefined => {
  if (!id) {
    return undefined
  }

  const author = state.data[id]
  return author && { ...pick(author, AuthorPropertyNames) }
}

export default getAuthorById
