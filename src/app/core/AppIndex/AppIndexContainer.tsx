import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import actions from '../../auth/store/actions'

import AppIndex from './AppIndex'
import { getUser } from 'app/auth/store/selectors'

const mapStateToProps = (state: AppState) => ({
  getUser: () => getUser(state.auth),
})

const mapDispatchToProps = dispatch => {
  const { setLocalUserData } = actions
  return {
    setLocalUserData: user => dispatch(setLocalUserData(user)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppIndex)
