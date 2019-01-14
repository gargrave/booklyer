import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import actions from '../store/actions'
import { getBooks } from '../store/books.selectors'

import BooksIndex from './BooksIndex'

const mapStateToProps = (state: AppState) => ({
  getBooks: () => getBooks(state.books),
})

const mapDispatchToProps = dispatch => {
  const { fetchBooks } = actions
  return {
    fetchBooks: () => dispatch(fetchBooks()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BooksIndex)
