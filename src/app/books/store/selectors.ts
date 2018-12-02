import { IBook } from '../types'
import { IBooksState } from './reducers'

export const getBooks = (state: IBooksState): IBook[] => state.data
