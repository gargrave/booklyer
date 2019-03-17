import { connect } from 'react-redux'

import { AppState } from 'store/reducers'

import { getAuthors } from 'app/authors/store/selectors'

import actions from '../store/actions'
import { getBooksRequestPending, getBooksWithAuthors } from '../store/selectors'
import { Book } from '../books.types'

import BooksIndex from './BooksIndex'

const mapStateToProps = (state: AppState) => ({
  getAuthors: () => getAuthors(state.authors),
  getBooks: () => getBooksWithAuthors(state),
  getBooksRequestPending: () => getBooksRequestPending(state.books),
})

const mapDispatchToProps = dispatch => {
  const { createBook, fetchBooks } = actions
  return {
    createBook: (ownerId: string, book: Book) =>
      dispatch(createBook(ownerId, book)),
    fetchBooks: (ownerId: string) => dispatch(fetchBooks(ownerId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BooksIndex)
