import { Book } from '../books.types'
import { BooksState } from './books.reducers'

export const getBooks = (state: BooksState): Book[] => Object.values(state.data)
