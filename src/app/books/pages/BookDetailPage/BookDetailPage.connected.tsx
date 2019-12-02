import { connect } from 'react-redux'

import { deleteBook, updateBook } from 'app/books/store/actions'
import { getAuthorsSortedByLastName } from 'app/authors/store/selectors'
import { getBookById, getBooksRequestPending } from 'app/books/store/selectors'
import { AppState } from 'store/reducers'

import { BookDetailPage, BookDetailPageProps } from './BookDetailPage'

type ReduxSelectors =
  | 'getAuthorsSortedByLastName'
  | 'getBookById'
  | 'getBooksRequestPending'

type ReduxActions = 'deleteBook' | 'updateBook'

type StateProps = Pick<BookDetailPageProps, ReduxSelectors>
type DispatchProps = Pick<BookDetailPageProps, ReduxActions>
type PassThruProps = Omit<BookDetailPageProps, ReduxSelectors | ReduxActions>

const mapStateToProps = (state: AppState): StateProps => ({
  getAuthorsSortedByLastName: () => getAuthorsSortedByLastName(state),
  getBookById: (id: string) => getBookById(state, id),
  getBooksRequestPending: () => getBooksRequestPending(state),
})

const mapDispatchToProps = {
  deleteBook,
  updateBook,
}

export const ConnectedBookDetailPage = connect<
  StateProps,
  DispatchProps,
  PassThruProps
>(
  mapStateToProps,
  mapDispatchToProps,
)(BookDetailPage)
