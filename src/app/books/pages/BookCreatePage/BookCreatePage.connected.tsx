import { connect } from 'react-redux'

import { createBook } from 'app/books/store/actions'
import { getAuthorsSortedByLastName } from 'app/authors/store/selectors'
import { getBooksRequestPending } from 'app/books/store/selectors'
import { AppState } from 'store/reducers'

import { BookCreatePage, BookCreatePageProps } from './BookCreatePage'

type ReduxSelectors = 'getAuthorsSortedByLastName' | 'getBooksRequestPending'
type ReduxActions = 'createBook'

type StateProps = Pick<BookCreatePageProps, ReduxSelectors>
type DispatchProps = Pick<BookCreatePageProps, ReduxActions>
type PassThruProps = Omit<BookCreatePageProps, ReduxSelectors | ReduxActions>

const mapStateToProps = (state: AppState): StateProps => ({
  getAuthorsSortedByLastName: () => getAuthorsSortedByLastName(state),
  getBooksRequestPending: () => getBooksRequestPending(state),
})

const mapDispatchToProps = {
  createBook,
}

export const ConnectedBookCreatePage = connect<
  StateProps,
  DispatchProps,
  PassThruProps
>(
  mapStateToProps,
  mapDispatchToProps,
)(BookCreatePage)
