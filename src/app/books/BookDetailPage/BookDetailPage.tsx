import * as React from 'react'

import { Author } from 'app/authors/authors.types'
import { DetailRouteProps } from 'app/core/core.types'
import { BooksReduxProps, Book } from '../books.types'

import Card from 'app/common/Card/Card'
import Loader from 'app/common/Loader/Loader'
import { DetailedBookCard } from '../components/BookCard'
import BookForm from '../components/BookForm/BookForm'

import styles from './BookDetailPage.module.scss'
import { AppContext } from 'app/core/AppIndex/App.context'

export type BookDetailPageProps = {} & DetailRouteProps & BooksReduxProps

const BookDetailPage: React.FunctionComponent<BookDetailPageProps> = ({
  getAuthorsSortedByLastName,
  getBookById,
  getBooksRequestPending,
  history,
  match,
  updateBook,
}) => {
  const { appInitialized, user } = React.useContext(AppContext)
  const [error, setError] = React.useState('')
  const [editing, setEditing] = React.useState(false)
  const [book, setBook] = React.useState<Book | undefined>(undefined)
  const [authors, setAuthors] = React.useState<Author[]>(
    getAuthorsSortedByLastName(),
  )
  const loading = !appInitialized || getBooksRequestPending()

  React.useEffect(() => {
    if (appInitialized) {
      if (user) {
        setAuthors(getAuthorsSortedByLastName())
        setBook(getBookById(match.params.id || ''))
      } else {
        history.push('/account/login')
      }
    }
  }, [appInitialized, getBookById, user])

  const handleBackClick = React.useCallback(() => {
    history.push('/books')
  }, [])

  const handleEditClick = React.useCallback(() => {
    setEditing(true)
  }, [])

  const handleCancel = React.useCallback(() => {
    setEditing(false)
  }, [])

  const handleSubmit = React.useCallback(
    async payload => {
      try {
        const mergedBook = {
          ...book,
          ...payload,
        }
        await updateBook(user!.id, mergedBook)
        setEditing(false)
      } catch (error) {
        setError('There was an error updating the Book.')
      }
    },
    [book, updateBook, user],
  )

  return appInitialized && user ? (
    <div>
      <div className={styles.contentWrapper}>
        {!editing && book && (
          <DetailedBookCard
            book={book}
            onBackClick={handleBackClick}
            onEditClick={handleEditClick}
          />
        )}

        {editing && book && (
          <Card>
            <Card.Header text={`Update ${book.title}`} />
            <BookForm
              authors={authors}
              disabled={loading}
              error={error}
              initialValue={book}
              loading={loading}
              onCancel={handleCancel}
              onSubmit={handleSubmit}
            />
          </Card>
        )}

        {loading && !book && <Loader size={44} />}
      </div>
    </div>
  ) : null
}

export default React.memo(BookDetailPage)
