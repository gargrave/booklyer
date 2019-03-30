import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import { getAuthorsSortedByLastName } from 'app/authors/store/selectors'

import { createBook, fetchBooks, updateBook } from '../store/actions'
import {
  getBookWithAuthorById,
  getBooksRequestPending,
  getBooksWithAuthors,
  getBucketedBooks,
} from '../store/selectors'
import { Book } from '../books.types'

import BooksIndex from './BooksIndex'

const mapStateToProps = (state: AppState) => ({
  getAuthorsSortedByLastName: () => getAuthorsSortedByLastName(state.authors),
  getBookById: (id: string) => getBookWithAuthorById(state, id),
  getBooks: () => getBooksWithAuthors(state),
  getBooksRequestPending: () => getBooksRequestPending(state.books),
  getBucketedBooks: () => getBucketedBooks(state),
})

const mapDispatchToProps = dispatch => ({
  createBook: (ownerId: string, book: Book) =>
    dispatch(createBook(ownerId, book)),
  fetchBooks: (ownerId: string) => dispatch(fetchBooks(ownerId)),
  updateBook: (ownerId: string, book: Book) =>
    dispatch(updateBook(ownerId, book)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BooksIndex)
