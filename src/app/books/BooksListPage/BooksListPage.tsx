import * as React from 'react'

import { BooksReduxProps } from '../books.types'

import { useRequiredAuthentication } from 'app/auth/utils/useRequiredAuthentication'

import Button from 'app/common/Button/Button'
import Loader from 'app/common/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'

import styles from './BooksListPage.module.scss'

export type BooksListPageProps = {
  history: any
} & BooksReduxProps

const BooksListPage: React.FunctionComponent<BooksListPageProps> = ({
  fetchBooks,
  getBooks,
  getBooksRequestPending,
  history,
}) => {
  const { getUser } = useRequiredAuthentication(history)
  const [books, setBooks] = React.useState(getBooks())
  const user = getUser()
  const loading = getBooksRequestPending()

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
      <section className={styles.contentWrapper}>
        <Button onClick={handleAddBookClick}>Add a Book</Button>
        {books.map(book => (
          <BookCard book={book} key={book.id} />
        ))}
        {loading && <Loader size={44} />}
      </section>
    </div>
  ) : null
}

export default React.memo(BooksListPage)
