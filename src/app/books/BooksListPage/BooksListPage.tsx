import * as React from 'react'

import { IBook } from '../types'

import Book from '../components/Book/Book'

export interface IBooksListPageProps {
  books: IBook[]
}

export default class BooksListPage extends React.Component<
  IBooksListPageProps
> {
  static defaultProps = {
    books: [],
  }

  render() {
    const { books } = this.props
    return (
      <>
        <h2>BooksListPage</h2>
        {books.map(book => (
          <Book book={book} key={book.id} />
        ))}
      </>
    )
  }
}
