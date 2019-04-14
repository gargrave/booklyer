import * as React from 'react'
import get from 'lodash/get'

import { AppContext } from 'app/core/AppIndex/App.context'
import { DetailRouteProps } from 'app/core/core.types'
import { AuthorsReduxProps, Author } from '../../authors.types'

import Button, { ButtonType } from 'packages/common/src/Button/Button'
import Card from 'packages/common/src/Card/Card'
import Loader from 'packages/common/src/Loader/Loader'

import SimpleBookCard from 'app/books/components/BookCard/Simple/SimpleBookCard'
import { DetailedAuthorCard } from '../../components/AuthorCard'
import AuthorForm from '../../components/AuthorForm/AuthorForm'

import styles from './AuthorDetailPage.module.scss'

export type AuthorDetailPageProps = {} & DetailRouteProps & AuthorsReduxProps

// TODO: show all current books by this author
// TODO: add an "Add Book by this Author" button
const AuthorDetailPage: React.FunctionComponent<AuthorDetailPageProps> = ({
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
  const books = appInitialized ? getBooksByAuthor(get(author, 'id')) : []

  React.useEffect(() => {
    if (appInitialized) {
      if (user) {
        setAuthor(getAuthorById(match.params.id || ''))
      } else {
        history.push('/account/login')
      }
    }
  }, [appInitialized, getAuthorById, user])

  const handleBackClick = React.useCallback(() => {
    history.push('/authors')
  }, [])

  const handleAddBookClick = React.useCallback(() => {
    history.push('/books/new')
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
        const mergedAuthor = {
          ...author,
          ...payload,
        }
        setError('')
        await updateAuthor(user!.id, mergedAuthor)
        setEditing(false)
      } catch (error) {
        setError('There was an error updating the Author.')
      }
    },
    [author, updateAuthor, user],
  )

  const handleDelete = React.useCallback(async () => {
    try {
      setError('')
      await deleteAuthor(user!.id, author!)
      history.push('/authors')
    } catch (error) {
      setError('There was an error deleting the Author.')
    }
  }, [author, deleteAuthor, user])

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
                <Button type={ButtonType.Primary} onClick={handleAddBookClick}>
                  Add Another Book
                </Button>
              </div>

              {books.map(book => (
                <SimpleBookCard
                  book={book}
                  key={book.id}
                  onClick={() => history.push(`/books/${book.id}`)}
                />
              ))}
            </div>
          </>
        )}

        {editing && author && (
          <>
            <Card>
              <Card.Header
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
}

export default React.memo(AuthorDetailPage)
