import { AuthState } from '../auth.reducers'
import { User } from '../../auth.types'

const getUser = (state: AuthState): User => state.data

export default getUser
