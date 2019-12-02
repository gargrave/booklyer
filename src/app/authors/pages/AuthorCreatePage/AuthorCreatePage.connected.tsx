import { connect } from 'react-redux'

import { createAuthor } from 'app/authors/store/actions'
import { getAuthorsRequestPending } from 'app/authors/store/selectors'
import { AppState } from 'store/reducers'

import { AuthorCreatePage, AuthorCreatePageProps } from './AuthorCreatePage'

type ReduxSelectors = 'getAuthorsRequestPending'
type ReduxActions = 'createAuthor'

type StateProps = Pick<AuthorCreatePageProps, ReduxSelectors>
type DispatchProps = Pick<AuthorCreatePageProps, ReduxActions>
type PassThruProps = Omit<AuthorCreatePageProps, ReduxSelectors | ReduxActions>

const mapStateToProps = (state: AppState): StateProps => ({
  getAuthorsRequestPending: () => getAuthorsRequestPending(state),
})

const mapDispatchToProps =  {
  createAuthor,
}

export const ConnectedAuthorCreatePage = connect<
  StateProps,
  DispatchProps,
  PassThruProps
>(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorCreatePage)
