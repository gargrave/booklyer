import * as React from 'react'

import { AuthorsReduxProps } from '../authors.types'

import { useRequiredAuthentication } from 'app/auth/utils/useRequiredAuthentication'

import Card from 'app/common/Card/Card'
import AuthorForm from '../components/AuthorForm/AuthorForm'

import styles from './AuthorCreatePage.module.scss'

export type AuthorCreatePageProps = { history: any } & AuthorsReduxProps

const AuthorCreatePage: React.FunctionComponent<AuthorCreatePageProps> = ({
  createAuthor,
  getAuthorsRequestPending,
  history,
}) => {
  const { getUser } = useRequiredAuthentication(history)
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(getAuthorsRequestPending())

  React.useEffect(() => {
    setLoading(getAuthorsRequestPending())
  }, [getAuthorsRequestPending])

  const user = getUser()

  const handleSubmit = React.useCallback(
    async payload => {
      try {
        await createAuthor(user.id, payload)
        history.push('/authors')
      } catch (error) {
        setError('There was an error creating the Author.')
      }
    },
    [history, user],
  )

  const handleCancel = React.useCallback(() => {
    history.push('/authors')
  }, [])

  return user ? (
    <div className={styles.contentWrapper}>
      <Card>
        <Card.Header text="Add an Author" />
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

export default React.memo(AuthorCreatePage)
