import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import actions from '../store/actions'

import AuthIndex from './AuthIndex'
import { getUser } from '../store/selectors'

const mapStateToProps = (state: AppState) => ({
  getUser: () => getUser(state.auth),
})

const mapDispatchToProps = dispatch => {
  const { login } = actions
  return {
    login: (email: string, password: string) =>
      dispatch(login(email, password)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthIndex)
