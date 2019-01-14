import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import actions from '../store/actions'
import { getAuthors } from '../store/authors.selectors'

import AuthorsIndex from './AuthorsIndex'

const mapStateToProps = (state: AppState) => ({
  getAuthors: () => getAuthors(state.authors),
})

const mapDispatchToProps = dispatch => {
  const { fetchAuthors } = actions
  return {
    fetchAuthors: () => dispatch(fetchAuthors()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorsIndex)
