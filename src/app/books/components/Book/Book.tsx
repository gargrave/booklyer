import * as React from 'react'

import { IBook } from '../../types'

export interface IBookProps {
  book: IBook
}

const Book: React.SFC<IBookProps> = ({ book }) => (
  <div>
    <span>{book.title}</span>
  </div>
)

export default Book
