import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import { setLocalUserData } from '../../auth/store/actions'

import AppIndex from './AppIndex'

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = dispatch => ({
  setLocalUserData: user => dispatch(setLocalUserData(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppIndex)
