import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import actions from '../store/actions'

import AuthIndex from './AuthIndex'

const mapStateToProps = (state: AppState) => ({})

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
