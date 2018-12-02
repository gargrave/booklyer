import { IAuthor } from '../types'
import { IAuthorsState } from './reducers'

export const getAuthors = (state: IAuthorsState): IAuthor[] => state.data
