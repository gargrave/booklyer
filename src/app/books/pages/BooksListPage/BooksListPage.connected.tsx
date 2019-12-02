import { connect } from 'react-redux'

import {
  getBooksRequestPending,
  getBucketedBooks,
} from 'app/books/store/selectors'
import { AppState } from 'store/reducers'

import { BooksListPage, BooksListPageProps } from './BooksListPage'

type ReduxSelectors = 'getBooksRequestPending' | 'getBucketedBooks'

type StateProps = Pick<BooksListPageProps, ReduxSelectors>
type PassThruProps = Omit<BooksListPageProps, ReduxSelectors>

const mapStateToProps = (state: AppState): StateProps => ({
  getBooksRequestPending: () => getBooksRequestPending(state),
  getBucketedBooks: () => getBucketedBooks(state),
})

export const ConnectedBooksListPage = connect<
  StateProps,
  null,
  PassThruProps
>(
  mapStateToProps,
  null,
)(BooksListPage)
