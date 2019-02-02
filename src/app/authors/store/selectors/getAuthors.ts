import { Author } from '../../authors.types'
import { AuthorsState } from '../authors.reducers'

const getAuthors = (state: AuthorsState): Author[] => Object.values(state.data)

export default getAuthors
