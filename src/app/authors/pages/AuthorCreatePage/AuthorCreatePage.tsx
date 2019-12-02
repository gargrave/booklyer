import * as React from 'react'

import { AppContext } from 'app/core/AppIndex/App.context'
import { Author } from 'app/authors/authors.types'
import { CreateRouteProps } from 'app/core/core.types'

import { Card, CardHeader } from 'packages/common'
import AuthorForm from 'app/authors/components/AuthorForm/AuthorForm'

import styles from './AuthorCreatePage.module.scss'

export type AuthorCreatePageProps = {
  createAuthor: (ownerId: string, author: Author) => Promise<void>
  getAuthorsRequestPending: () => boolean
} & CreateRouteProps

export const AuthorCreatePage: React.FC<AuthorCreatePageProps> = ({
  createAuthor,
  getAuthorsRequestPending,
  history,
}) => {
  const { appInitialized, user } = React.useContext(AppContext)
  const [error, setError] = React.useState('')
  const loading = !appInitialized || getAuthorsRequestPending()

  React.useEffect(() => {
    if (appInitialized && !user) {
      history.push('/account/login')
    }
  }, [appInitialized, user]) // eslint-disable-line

  const handleSubmit = React.useCallback(
    async payload => {
      try {
        if (user) {
          setError('')
          await createAuthor(user.id, payload)
          history.push('/authors')
        }
      } catch (error) {
        setError('There was an error creating the Author.')
      }
    },
    [createAuthor, history, user],
  )

  const handleCancel = React.useCallback(() => {
    history.push('/authors')
  }, []) // eslint-disable-line

  return appInitialized && user ? (
    <div className={styles.contentWrapper}>
      <Card>
        <CardHeader text="Add an Author" />
        <AuthorForm
          disabled={loading}
          error={error}
          loading={loading}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  ) : null
}
