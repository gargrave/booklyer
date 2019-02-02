import pick from 'lodash/pick'

import { AppState } from 'store/reducers'
import { Book, BookPropertyNames } from '../../books.types'

import { getAuthorById } from '../../../authors/store/selectors'

const getBooksWithAuthors = (state: AppState): Book[] =>
  Object.values(state.books.data).map(book => {
    const author = getAuthorById(state.authors, book.authorId)
    return {
      ...pick(book, BookPropertyNames),
      author,
    }
  })

export default getBooksWithAuthors
