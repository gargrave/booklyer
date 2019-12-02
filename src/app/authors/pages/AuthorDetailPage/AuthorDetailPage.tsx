import * as React from 'react'

import { Author } from 'app/authors/authors.types'
import { Book } from 'app/books/books.types'
import { AppContext } from 'app/core/AppIndex/App.context'
import { DetailRouteProps } from 'app/core/core.types'

import { Button, ButtonType, Card, CardHeader } from 'packages/common'

import { DetailedAuthorCard } from 'app/authors/components/AuthorCard'
import AuthorForm from 'app/authors/components/AuthorForm/AuthorForm'
import SimpleBookCard from 'app/books/components/BookCard/Simple/SimpleBookCard'
import { Loader } from 'app/core/components'

import styles from './AuthorDetailPage.module.scss'

export type AuthorDetailPageProps = {
  deleteAuthor: (ownerId: string, author: Author) => Promise<void>
  getAuthorById: (id: string) => Author | undefined
  getAuthorsRequestPending: () => boolean
  getBooksByAuthor: (authorId: string) => Book[]
  updateAuthor: (ownerId: string, author: Author) => Promise<Author[]>
} & DetailRouteProps

// TODO: show all current books by this author
// TODO: add an "Add Book by this Author" button
export const AuthorDetailPage: React.FC<AuthorDetailPageProps> = React.memo(
  ({
    deleteAuthor,
    getAuthorById,
    getAuthorsRequestPending,
    getBooksByAuthor,
    history,
    match,
    updateAuthor,
  }) => {
    const { appInitialized, user } = React.useContext(AppContext)
    const [error, setError] = React.useState('')
    const [editing, setEditing] = React.useState(false)
    const [author, setAuthor] = React.useState<Author | undefined>(undefined)
    const loading = !appInitialized || getAuthorsRequestPending()

    const authorId = author?.id
    const books = appInitialized && authorId ? getBooksByAuthor(authorId) : []

    const navigateTo = React.useCallback(
      (url: string): void => {
        history.push(url)
      },
      [history],
    )

    React.useEffect(() => {
      if (appInitialized) {
        if (user) {
          const authorId = match.params.id || ''
          setAuthor(getAuthorById(authorId))
        } else {
          navigateTo('/account/login')
        }
      }
    }, [appInitialized, getAuthorById, user]) // eslint-disable-line

    const handleBackClick = React.useCallback(() => {
      navigateTo('/authors')
    }, [navigateTo])

    const handleAddBookClick = React.useCallback(() => {
      navigateTo('/books/new')
    }, [navigateTo])

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
            const mergedAuthor = {
              ...author,
              ...payload,
            }
            setError('')
            await updateAuthor(user.id, mergedAuthor)
            setEditing(false)
          }
        } catch (error) {
          setError('There was an error updating the Author.')
        }
      },
      [author, updateAuthor, user],
    )

    const handleDelete = React.useCallback(async () => {
      try {
        if (user && author) {
          setError('')
          await deleteAuthor(user.id, author)
          navigateTo('/authors')
        }
      } catch (error) {
        setError('There was an error deleting the Author.')
      }
    }, [author, deleteAuthor, navigateTo, user]) // eslint-disable-line

    return appInitialized && user ? (
      <div>
        <div className={styles.contentWrapper}>
          {!editing && author && (
            <>
              <DetailedAuthorCard
                author={author}
                onBackClick={handleBackClick}
                onEditClick={handleEditClick}
              />

              <div>
                <hr />
                <div className={styles.booksListHeader}>
                  Books by{' '}
                  <strong>
                    {author.firstName} {author.lastName}
                  </strong>{' '}
                  ({books.length})
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <Button
                    type={ButtonType.Primary}
                    onClick={handleAddBookClick}
                  >
                    Add Another Book
                  </Button>
                </div>

                {books.map(book => (
                  <SimpleBookCard
                    book={book}
                    key={book.id}
                    onClick={() => navigateTo(`/books/${book.id}`)}
                  />
                ))}
              </div>
            </>
          )}

          {editing && author && (
            <>
              <Card>
                <CardHeader
                  text={`Update ${author.firstName} ${author.lastName}`}
                />
                <AuthorForm
                  disabled={loading}
                  error={error}
                  initialValue={author}
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

          {loading && !author && <Loader size={44} />}
        </div>
      </div>
    ) : null
  },
)
