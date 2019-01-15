import { Author } from '../authors.types'
import { AuthorsState } from './authors.reducers'

export const getAuthors = (state: AuthorsState): Author[] =>
  Object.values(state.data)
