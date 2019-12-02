import { connect } from 'react-redux'

import { deleteAuthor, updateAuthor } from 'app/authors/store/actions'
import {
  getAuthorById,
  getAuthorsRequestPending,
} from 'app/authors/store/selectors'
import { getBooksByAuthor } from 'app/books/store/selectors'
import { AppState } from 'store/reducers'

import { AuthorDetailPage, AuthorDetailPageProps } from './AuthorDetailPage'

type ReduxSelectors =
  | 'getAuthorById'
  | 'getAuthorsRequestPending'
  | 'getBooksByAuthor'

type ReduxActions = 'deleteAuthor' | 'updateAuthor'

type StateProps = Pick<AuthorDetailPageProps, ReduxSelectors>
type DispatchProps = Pick<AuthorDetailPageProps, ReduxActions>
type PassThruProps = Omit<AuthorDetailPageProps, ReduxSelectors | ReduxActions>

const mapStateToProps = (state: AppState): StateProps => ({
  getAuthorById: (id: string) => getAuthorById(state, id),
  getAuthorsRequestPending: () => getAuthorsRequestPending(state),
  getBooksByAuthor: (authorId: string) => getBooksByAuthor(state, authorId),
})

const mapDispatchToProps = {
  deleteAuthor,
  updateAuthor,
}

export const ConnectedAuthorDetailPage = connect<
  StateProps,
  DispatchProps,
  PassThruProps
>(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorDetailPage)
