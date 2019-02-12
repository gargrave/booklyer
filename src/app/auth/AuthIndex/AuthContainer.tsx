import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
// import actions from '../store/actions'

import AuthIndex from './AuthIndex'

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthIndex)
