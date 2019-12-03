import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import { register } from 'app/auth/store/actions'
import { getAuthRequestPending } from 'app/auth/store/selectors'

import { RegisterPage, RegisterPageProps } from './RegisterPage'

type ReduxSelectors = 'getAuthRequestPending'
type ReduxActions = 'register'

type StateProps = Pick<RegisterPageProps, ReduxSelectors>
type DispatchProps = Pick<RegisterPageProps, ReduxActions>
type PassThruProps = Omit<RegisterPageProps, ReduxSelectors>

const mapStateToProps = (state: AppState) => ({
  getAuthRequestPending: () => getAuthRequestPending(state.auth),
})

const mapDispatchToProps = {
  register,
}

export const ConnectedRegisterPage = connect<
  StateProps,
  DispatchProps,
  PassThruProps
>(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterPage)
