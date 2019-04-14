import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import {
  createAuthor,
  deleteAuthor,
  fetchAuthors,
  updateAuthor,
} from '../store/actions'
import {
  getAuthorById,
  getAuthorsRequestPending,
  getAuthorsSortedByLastName,
  getBucketedAuthors,
} from '../store/selectors'
import { getBooksByAuthor } from 'app/books/store/selectors'

import { Author } from '../authors.types'

import AuthorsIndex from './AuthorsIndex'

const mapStateToProps = (state: AppState) => ({
  getAuthorById: (id: string) => getAuthorById(state.authors, id),
  getAuthors: () => getAuthorsSortedByLastName(state.authors),
  getAuthorsRequestPending: () => getAuthorsRequestPending(state.authors),
  getBooksByAuthor: (authorId: string) => getBooksByAuthor(state, authorId),
  getBucketedAuthors: () => getBucketedAuthors(state.authors),
})

const mapDispatchToProps = dispatch => ({
  createAuthor: (ownerId: string, author: Author) =>
    dispatch(createAuthor(ownerId, author)),
  deleteAuthor: (ownerId: string, author: Author) =>
    dispatch(deleteAuthor(ownerId, author)),
  fetchAuthors: (ownerId: string) => dispatch(fetchAuthors(ownerId)),
  updateAuthor: (ownerId: string, author: Author) =>
    dispatch(updateAuthor(ownerId, author)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorsIndex)
