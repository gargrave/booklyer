import { createSelector } from 'reselect'
import pick from 'lodash/pick'

import { AppState } from '../../../../store/reducers'
import { Author, AuthorPropertyNames } from '../../authors.types'

const rawGetAuthorById = (state: AppState, id: string): Author | undefined => {
  const author = state.authors.data[id]
  return author && ({ ...pick(author, AuthorPropertyNames) } as Author) // eslint-disable-line
}

export const getAuthorById = createSelector(
  rawGetAuthorById,
  author => author,
)
