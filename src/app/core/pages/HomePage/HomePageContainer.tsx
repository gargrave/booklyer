import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import { getAuthorsSortedByLastName } from 'app/authors/store/selectors'
import { getBooks } from 'app/books/store/selectors'

import HomePage from './HomePage'

const mapStateToProps = (state: AppState) => ({
  getAuthors: () => getAuthorsSortedByLastName(state),
  getBooks: () => getBooks(state),
})

const mapDispatchToProps = _dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage)
