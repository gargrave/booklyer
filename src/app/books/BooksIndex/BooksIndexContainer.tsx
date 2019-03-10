import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import actions from '../store/actions'
import { getBooksWithAuthors } from '../store/selectors'
import { Book } from '../books.types'

import BooksIndex from './BooksIndex'

const mapStateToProps = (state: AppState) => ({
  getBooks: () => getBooksWithAuthors(state),
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
