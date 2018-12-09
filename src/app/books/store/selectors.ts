import { Book } from '../types'
import { BooksState } from './reducers'

export const getBooks = (state: BooksState): Book[] => state.data
