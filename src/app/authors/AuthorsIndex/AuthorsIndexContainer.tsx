import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import { fetchAuthors } from '../store/actions'
import { getAuthors } from '../store/selectors'

import AuthorsIndex from './AuthorsIndex'

const mapStateToProps = (state: AppState) => ({
  getAuthors: () => getAuthors(state.authors),
})

const mapDispatchToProps = dispatch => ({
  fetchAuthors: () => dispatch(fetchAuthors()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorsIndex)
