import * as React from 'react'

import { Author } from 'app/authors/authors.types'
import { DetailRouteProps } from 'app/core/core.types'
import { BooksReduxProps, Book } from '../../books.types'

import Button, { ButtonType } from 'packages/common/src/Button/Button'
import Card from 'packages/common/src/Card/Card'
import { Loader } from 'app/core/components'
import { DetailedBookCard } from '../../components/BookCard'
import BookForm from '../../components/BookForm/BookForm'

import styles from './BookDetailPage.module.scss'
import { AppContext } from 'app/core/AppIndex/App.context'

export type BookDetailPageProps = {} & DetailRouteProps & BooksReduxProps

const BookDetailPage: React.FunctionComponent<BookDetailPageProps> = ({
  deleteBook,
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

  // TODO: fix the linting error and clean up the logic here
  //  i.e. getAuthorsSorted... needs to be a dep, but
  //  it should only be called when "initialized" state changes
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
  }, []) // eslint-disable-line

  const handleEditClick = React.useCallback(() => {
    setEditing(true)
  }, [])

  const handleCancel = React.useCallback(() => {
    setEditing(false)
  }, [])

  const handleSubmit = React.useCallback(
    async payload => {
      try {
        if (user) {
          const mergedBook = {
            ...book,
            ...payload,
          }
          setError('')
          await updateBook(user.id, mergedBook)
          setEditing(false)
        }
      } catch (error) {
        setError('There was an error updating the Book.')
      }
    },
    [book, updateBook, user],
  )

  const handleDelete = React.useCallback(async () => {
    try {
      if (user && book) {
        setError('')
        await deleteBook(user.id, book)
        history.push('/books')
      }
    } catch (error) {
      setError('There was an error deleting the Book.')
    }
  }, [book, deleteBook, user]) // eslint-disable-line

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
          <>
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
            <Card>
              <Button
                block={true}
                disabled={loading}
                loading={loading}
                onClick={handleDelete}
                requireExtraClick={true}
                type={ButtonType.Secondary}
              >
                Delete
              </Button>
            </Card>
          </>
        )}

        {loading && !book && <Loader size={44} />}
      </div>
    </div>
  ) : null
}

export default React.memo(BookDetailPage)
