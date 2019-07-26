import { connect } from 'react-redux'

import { AppState } from 'store/reducers'
import { fetchBooks } from 'app/books/store/actions'
import { setLocalUserData } from '../../auth/store/actions'

import AppIndex from './AppIndex'

const mapStateToProps = (_state: AppState) => ({})

const mapDispatchToProps = dispatch => ({
  fetchBooks: (ownerId: string) => dispatch(fetchBooks(ownerId)),
  setLocalUserData: user => dispatch(setLocalUserData(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppIndex)
