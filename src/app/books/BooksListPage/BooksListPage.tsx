import * as React from 'react'

import { Book as BookType, BooksReduxProps } from '../books.types'

import Book from '../components/Book/Book'

const initialState = (): BooksListPageState => ({
  books: [] as BookType[],
})

export type BooksListPageProps = {} & BooksReduxProps

export type BooksListPageState = {
  books: BookType[]
}

export default class BooksListPage extends React.Component<
  BooksListPageProps,
  BooksListPageState
> {
  static defaultProps = {
    books: [],
  }

  state = initialState()

  async componentDidMount() {
    let books = this.props.getBooks()
    if (!books.length) {
      await this.props.fetchBooks()
      books = this.props.getBooks()
    }
    this.setState({ books })
  }

  render() {
    const { books } = this.state
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
