import { Author } from '../authors.types'
import { AuthorsState } from './reducers'

export const getAuthors = (state: AuthorsState): Author[] => state.data
