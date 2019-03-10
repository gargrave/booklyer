import * as React from 'react'

import { BooksReduxProps } from '../books.types'

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
  const { getUser } = useRequiredAuthentication(history)
  const [books, setBooks] = React.useState(getBooks())
  const user = getUser()

  React.useEffect(() => {
    if (user && !books.length) {
      fetchBooks(user.id)
    }
  }, [])

  React.useEffect(() => {
    if (user) {
      setBooks(getBooks())
    }
  }, [getBooks])

  function handleAddBookClick() {
    history.push('/books/new')
  }

  return user ? (
    <div>
      <h2>My Books</h2>
      <Button onClick={handleAddBookClick}>Add a Book</Button>
      {books.map(book => (
        <BookCard book={book} key={book.id} />
      ))}
    </div>
  ) : null
}

export default React.memo(BooksListPage)
