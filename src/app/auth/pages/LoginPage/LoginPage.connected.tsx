import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import { login } from 'app/auth/store/actions'
import { getAuthRequestPending } from 'app/auth/store/selectors'

import { LoginPage, LoginPageProps } from './LoginPage'

type ReduxSelectors = 'getAuthRequestPending'
type ReduxActions = 'login'

type StateProps = Pick<LoginPageProps, ReduxSelectors>
type DispatchProps = Pick<LoginPageProps, ReduxActions>
type PassThruProps = Omit<LoginPageProps, ReduxSelectors>

const mapStateToProps = (state: AppState) => ({
  getAuthRequestPending: () => getAuthRequestPending(state.auth),
})

const mapDispatchToProps = {
  login,
}

export const ConnectedLoginPage = connect<
  StateProps,
  DispatchProps,
  PassThruProps
>(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage)
