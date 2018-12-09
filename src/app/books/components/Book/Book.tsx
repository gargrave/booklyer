import * as React from 'react'

import { Book as BookType } from '../../types'

export type BookProps = {
  book: BookType
}

const Book: React.SFC<BookProps> = ({ book }) => (
  <div>
    <span>{book.title}</span>
  </div>
)

export default Book
