import * as React from 'react'

import { AppContext } from 'app/core/AppIndex/App.context'
import { AuthorsReduxProps } from '../../authors.types'

import Card from 'packages/common/src/Card/Card'
import AuthorForm from '../../components/AuthorForm/AuthorForm'

import styles from './AuthorCreatePage.module.scss'
import { CreateRouteProps } from 'app/core/core.types'

export type AuthorCreatePageProps = {} & CreateRouteProps & AuthorsReduxProps

const AuthorCreatePage: React.FunctionComponent<AuthorCreatePageProps> = ({
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
  }, [appInitialized, user])

  const handleSubmit = React.useCallback(
    async payload => {
      try {
        setError('')
        await createAuthor(user!.id, payload)
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

  return appInitialized && user ? (
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