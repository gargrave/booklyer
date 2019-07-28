import { createSelector } from 'reselect'
import pick from 'lodash/pick'

import { AppState } from '../../../../store/reducers'
import { Author, AuthorPropertyNames } from '../../authors.types'

const rawGetAuthorById = (state: AppState, id?: string): Author | undefined => {
  if (!id) {
    return undefined
  }

  const author = state.authors.data[id]
  return author && { ...pick(author, AuthorPropertyNames) }
}

export const getAuthorById = createSelector(
  rawGetAuthorById,
  author => author,
)
