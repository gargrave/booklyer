import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { AppState } from 'store/reducers'

import AuthorsIndex from './AuthorsIndex'

const mapStateToProps = (state: AppState) => ({
  authors: state.authors.data,
})

const mapDispatchToProps = dispatch => ({
  // actions: bindActionCreators({}, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorsIndex)
