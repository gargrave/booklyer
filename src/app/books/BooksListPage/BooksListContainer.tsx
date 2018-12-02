import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { IAppState } from 'store/reducers'

import BooksListPage from './BooksListPage'

const mapStateToProps = (state: IAppState) => ({
  books: state.books.data,
})

const mapDispatchToProps = dispatch => ({
  // actions: bindActionCreators({}, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BooksListPage)
