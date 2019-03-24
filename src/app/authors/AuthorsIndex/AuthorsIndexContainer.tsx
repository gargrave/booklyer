import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import { createAuthor, fetchAuthors } from '../store/actions'
import {
  getAuthorById,
  getAuthorsRequestPending,
  getAuthorsSortedByLastName,
  getBucketedAuthors,
} from '../store/selectors'

import { Author } from '../authors.types'

import AuthorsIndex from './AuthorsIndex'

const mapStateToProps = (state: AppState) => ({
  getAuthorById: (id: string) => getAuthorById(state.authors, id),
  getAuthors: () => getAuthorsSortedByLastName(state.authors),
  getAuthorsRequestPending: () => getAuthorsRequestPending(state.authors),
  getBucketedAuthors: () => getBucketedAuthors(state.authors),
})

const mapDispatchToProps = dispatch => ({
  createAuthor: (ownerId: string, author: Author) =>
    dispatch(createAuthor(ownerId, author)),
  fetchAuthors: (ownerId: string) => dispatch(fetchAuthors(ownerId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorsIndex)
