import * as React from 'react'

import { DetailRouteProps } from 'app/core/core.types'
import { AuthorsReduxProps, Author } from '../authors.types'

import { useRequiredAuthentication } from 'app/auth/utils/useRequiredAuthentication'

import Card from 'app/common/Card/Card'
import Loader from 'app/common/Loader/Loader'
import { DetailedAuthorCard } from '../components/AuthorCard'
import AuthorForm from '../components/AuthorForm/AuthorForm'

import styles from './AuthorDetailPage.module.scss'

export type AuthorDetailPageProps = {} & DetailRouteProps & AuthorsReduxProps

const AuthorDetailPage: React.FunctionComponent<AuthorDetailPageProps> = ({
  getAuthorById,
  getAuthorsRequestPending,
  history,
  match,
  updateAuthor,
}) => {
  const { getUser } = useRequiredAuthentication(history)
  const [error, setError] = React.useState('')
  const [editing, setEditing] = React.useState(false)
  const [author, setAuthor] = React.useState<Author | undefined>(undefined)

  const user = getUser()
  const loading = getAuthorsRequestPending()

  React.useEffect(() => {
    setAuthor(getAuthorById(match.params.id || ''))
  }, [getAuthorById])

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
        await updateAuthor(user.id, mergedAuthor)
        setEditing(false)
      } catch (error) {
        setError('There was an error updating the Author.')
      }
    },
    [author, updateAuthor, user],
  )

  return user ? (
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
        )}

        {loading && !author && <Loader size={44} />}
      </div>
    </div>
  ) : null
}

export default React.memo(AuthorDetailPage)
