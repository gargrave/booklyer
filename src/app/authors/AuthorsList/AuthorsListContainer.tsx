import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { AppState } from 'store/reducers'

import AuthorsListPage from './AuthorsListPage'

const mapStateToProps = (state: AppState) => ({
  authors: state.authors.data,
})

const mapDispatchToProps = dispatch => ({
  // actions: bindActionCreators({}, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorsListPage)
