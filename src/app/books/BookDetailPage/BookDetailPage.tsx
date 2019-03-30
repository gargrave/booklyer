import * as React from 'react'

import { DetailRouteProps } from 'app/core/core.types'
import { BooksReduxProps } from '../books.types'

import { useRequiredAuthentication } from 'app/auth/utils/useRequiredAuthentication'

import Card from 'app/common/Card/Card'
import Loader from 'app/common/Loader/Loader'
import { DetailedBookCard } from '../components/BookCard'
import BookForm from '../components/BookForm/BookForm'

import styles from './BookDetailPage.module.scss'

export type BookDetailPageProps = {} & DetailRouteProps & BooksReduxProps

const BookDetailPage: React.FunctionComponent<BookDetailPageProps> = ({
  getAuthorsSortedByLastName,
  getBookById,
  getBooksRequestPending,
  history,
  match,
  updateBook,
}) => {
  const { getUser } = useRequiredAuthentication(history)
  const [error, setError] = React.useState('')
  const [editing, setEditing] = React.useState(false)

  const user = getUser()
  const loading = getBooksRequestPending()
  const book = getBookById(match.params.id || '')
  const authors = getAuthorsSortedByLastName()

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
        await updateBook(user.id, mergedBook)
        setEditing(false)
      } catch (error) {
        setError('There was an error updating the Book.')
      }
    },
    [book, updateBook, user],
  )

  return user ? (
    <div>
      <div className={styles.contentWrapper}>
        {!editing && book && (
          <DetailedBookCard
            book={book}
            onBackClick={handleBackClick}
            onEditClick={handleEditClick}
          />
        )}

        {editing && (
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
