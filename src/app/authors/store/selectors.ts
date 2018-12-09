import { Author } from '../types'
import { AuthorsState } from './reducers'

export const getAuthors = (state: AuthorsState): Author[] => state.data
