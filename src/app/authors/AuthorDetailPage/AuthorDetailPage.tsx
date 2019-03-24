import * as React from 'react'

import { DetailRouteProps } from 'app/core/core.types'
import { AuthorsReduxProps } from '../authors.types'

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
}) => {
  const { getUser } = useRequiredAuthentication(history)
  const [error, setError] = React.useState('')
  const [editing, setEditing] = React.useState(false)

  const user = getUser()
  const loading = getAuthorsRequestPending()
  const author = getAuthorById(match.params.id || '')

  function handleBackClick() {
    history.push('/authors')
  }

  function handleEditClick() {
    setEditing(true)
  }

  function handleCancel() {
    setEditing(false)
  }

  async function handleSubmit(payload) {
    try {
      // await createAuthor(user.id, payload)
      console.log('TODO: submit the request to update the author')
      setEditing(false)
    } catch (error) {
      setError('There was an error updating the Author.')
    }
  }

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

        {editing && (
          <Card>
            <Card.Header
              text={`Update ${author.firstName} ${author.lastName}`}
            />
            <AuthorForm
              disabled={loading}
              error={error}
              loading={loading}
              onCancel={handleCancel}
              onSubmit={handleSubmit}
            />
          </Card>
        )}

        {loading && <Loader size={44} />}
      </div>
    </div>
  ) : null
}

export default React.memo(AuthorDetailPage)
