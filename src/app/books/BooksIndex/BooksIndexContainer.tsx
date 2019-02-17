import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import actions from '../store/actions'
import { getBooksWithAuthors } from '../store/selectors'

import BooksIndex from './BooksIndex'

const mapStateToProps = (state: AppState) => ({
  getBooks: () => getBooksWithAuthors(state),
})

const mapDispatchToProps = dispatch => {
  const { fetchBooks } = actions
  return {
    fetchBooks: (ownerId: string) => dispatch(fetchBooks(ownerId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BooksIndex)
