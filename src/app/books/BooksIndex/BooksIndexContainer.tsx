import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import { fetchBooks } from '../store/actions'
import { getBooks } from '../store/selectors'

import BooksIndex from './BooksIndex'

const mapStateToProps = (state: AppState) => ({
  getBooks: () => getBooks(state.books),
})

const mapDispatchToProps = dispatch => ({
  fetchBooks: () => dispatch(fetchBooks()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BooksIndex)
