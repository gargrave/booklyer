import * as React from 'react'

import { AppContext } from 'app/core/AppIndex/App.context'
import { DetailRouteProps } from 'app/core/core.types'
import { AuthorsReduxProps, Author } from '../authors.types'

import Card from 'app/common/Card/Card'
import Loader from 'app/common/Loader/Loader'
import { DetailedAuthorCard } from '../components/AuthorCard'
import AuthorForm from '../components/AuthorForm/AuthorForm'

import styles from './AuthorDetailPage.module.scss'
import Button, { ButtonType } from 'app/common/Button/Button'

export type AuthorDetailPageProps = {} & DetailRouteProps & AuthorsReduxProps

const AuthorDetailPage: React.FunctionComponent<AuthorDetailPageProps> = ({
  deleteAuthor,
  getAuthorById,
  getAuthorsRequestPending,
  history,
  match,
  updateAuthor,
}) => {
  const { appInitialized, user } = React.useContext(AppContext)
  const [error, setError] = React.useState('')
  const [editing, setEditing] = React.useState(false)
  const [author, setAuthor] = React.useState<Author | undefined>(undefined)
  const loading = !appInitialized || getAuthorsRequestPending()

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
          <DetailedAuthorCard
            author={author}
            onBackClick={handleBackClick}
            onEditClick={handleEditClick}
          />
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
