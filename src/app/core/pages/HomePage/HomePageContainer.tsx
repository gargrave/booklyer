import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import { getAuthorsSortedByLastName } from 'app/authors/store/selectors'
import { getBooksWithAuthors } from 'app/books/store/selectors'

import HomePage from './HomePage'

const mapStateToProps = (state: AppState) => ({
  getAuthors: () => getAuthorsSortedByLastName(state.authors),
  getBooks: () => getBooksWithAuthors(state),
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage)
