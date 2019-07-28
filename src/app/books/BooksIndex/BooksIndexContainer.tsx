import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import { getAuthorsSortedByLastName } from 'app/authors/store/selectors'

import {
  createBook,
  deleteBook,
  fetchBooks,
  updateBook,
} from '../store/actions'
import {
  getBookById,
  getBooks,
  getBooksRequestPending,
  getBucketedBooks,
} from '../store/selectors'
import { Book } from '../books.types'

import BooksIndex from './BooksIndex'

const mapStateToProps = (state: AppState) => ({
  getAuthorsSortedByLastName: () => getAuthorsSortedByLastName(state),
  getBookById: (id: string) => getBookById(state, id),
  getBooks: () => getBooks(state),
  getBooksRequestPending: () => getBooksRequestPending(state),
  getBucketedBooks: () => getBucketedBooks(state),
})

const mapDispatchToProps = dispatch => ({
  createBook: (ownerId: string, book: Book) =>
    dispatch(createBook(ownerId, book)),
  deleteBook: (ownerId: string, book: Book) =>
    dispatch(deleteBook(ownerId, book)),
  fetchBooks: (ownerId: string) => dispatch(fetchBooks(ownerId)),
  updateBook: (ownerId: string, book: Book) =>
    dispatch(updateBook(ownerId, book)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BooksIndex)
