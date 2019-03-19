import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import { login } from '../store/actions'
import { getAuthRequestPending } from '../store/selectors'

import AuthIndex from './AuthIndex'

const mapStateToProps = (state: AppState) => ({
  getAuthRequestPending: () => getAuthRequestPending(state.auth),
})

const mapDispatchToProps = dispatch => ({
  login: (email: string, password: string) => dispatch(login(email, password)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthIndex)
