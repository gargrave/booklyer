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
} from '../store/selectors'
import { getBooksByAuthor } from 'app/books/store/selectors'

import { Author, AuthorsSelectors } from '../authors.types'

import AuthorsIndex from './AuthorsIndex'

const mapStateToProps = (state: AppState) => {
  const selectors: AuthorsSelectors = {
    getAuthorById: (id: string) => getAuthorById(state, id),
    getAuthors: () => getAuthorsSortedByLastName(state),
    getAuthorsRequestPending: () => getAuthorsRequestPending(state),
    getBooksByAuthor: (authorId: string) => getBooksByAuthor(state, authorId),
  }
  return selectors
}

const mapDispatchToProps = dispatch => ({
  createAuthor: (ownerId: string, author: Author) =>
    dispatch(createAuthor(ownerId, author)),
  deleteAuthor: (ownerId: string, author: Author) =>
    dispatch(deleteAuthor(ownerId, author)),
  fetchAuthors: (ownerId: string) => dispatch(fetchAuthors(ownerId)),
  updateAuthor: (ownerId: string, author: Author) =>
    dispatch(updateAuthor(ownerId, author)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsIndex)
