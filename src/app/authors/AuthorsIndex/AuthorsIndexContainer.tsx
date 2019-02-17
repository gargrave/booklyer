import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import actions from '../store/actions'
import { getAuthors } from '../store/selectors'

import AuthorsIndex from './AuthorsIndex'

const mapStateToProps = (state: AppState) => ({
  getAuthors: () => getAuthors(state.authors),
})

const mapDispatchToProps = dispatch => {
  const { fetchAuthors } = actions
  return {
    fetchAuthors: (ownerId: string) => dispatch(fetchAuthors(ownerId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorsIndex)
