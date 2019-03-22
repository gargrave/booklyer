import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import actions from '../store/actions'
import {
  getAuthorsRequestPending,
  getAuthorsSortedByLastName,
} from '../store/selectors'

import { Author } from '../authors.types'

import AuthorsIndex from './AuthorsIndex'

const mapStateToProps = (state: AppState) => ({
  getAuthors: () => getAuthorsSortedByLastName(state.authors),
  getAuthorsRequestPending: () => getAuthorsRequestPending(state.authors),
})

const mapDispatchToProps = dispatch => {
  const { createAuthor, fetchAuthors } = actions
  return {
    createAuthor: (ownerId: string, author: Author) =>
      dispatch(createAuthor(ownerId, author)),
    fetchAuthors: (ownerId: string) => dispatch(fetchAuthors(ownerId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorsIndex)
