import * as React from 'react'

import { Book as BookType } from '../types'

import Book from '../components/Book/Book'

export type BooksListPageProps = {
  books: BookType[]
}

export default class BooksListPage extends React.Component<BooksListPageProps> {
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
