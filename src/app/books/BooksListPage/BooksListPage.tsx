import * as React from 'react'

import { Book, BooksReduxProps } from '../books.types'

import { useRequiredAuthentication } from 'app/auth/utils/useRequiredAuthentication'

import Button from 'app/common/Button/Button'
import BookCard from '../components/BookCard/BookCard'

export type BooksListPageProps = {
  history: any
} & BooksReduxProps

const BooksListPage: React.FunctionComponent<BooksListPageProps> = ({
  fetchBooks,
  getBooks,
  history,
}) => {
  const { user } = useRequiredAuthentication(history)
  const [books, setBooks] = React.useState([] as Book[])

  const initializeBooks = async () => {
    const fetchedBooks = getBooks()
    if (!fetchedBooks.length) {
      await fetchBooks()
    } else {
      setBooks(fetchedBooks)
    }
  }

  React.useEffect(() => {
    if (user) {
      initializeBooks()
    }
  }, [])

  React.useEffect(() => {
    if (user) {
      setBooks(getBooks())
    }
  }, [getBooks])

  return user ? (
    <div>
      <h2>My Books</h2>
      <Button onClick={() => void 0}>Add a Book</Button>
      {books.map(book => (
        <BookCard book={book} key={book.id} />
      ))}
    </div>
  ) : null
}

export default React.memo(BooksListPage)
