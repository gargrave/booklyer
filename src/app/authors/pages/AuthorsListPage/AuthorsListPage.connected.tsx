import { connect } from 'react-redux'

import {
  getAuthorsRequestPending,
  getBucketedAuthors,
} from 'app/authors/store/selectors'
import { AppState } from 'store/reducers'

import { AuthorsListPage, AuthorsListPageProps } from './AuthorsListPage'

type ReduxSelectors = 'getAuthorsRequestPending' | 'getBucketedAuthors'

type StateProps = Pick<AuthorsListPageProps, ReduxSelectors>
type PassThruProps = Omit<AuthorsListPageProps, ReduxSelectors>

const mapStateToProps = (state: AppState): StateProps => ({
  getAuthorsRequestPending: () => getAuthorsRequestPending(state),
  getBucketedAuthors: () => getBucketedAuthors(state),
})

export const ConnectedAuthorsListPage = connect<
  StateProps,
  null,
  PassThruProps
>(
  mapStateToProps,
  null,
)(AuthorsListPage)
