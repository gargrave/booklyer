import * as React from 'react'

import { AuthorsReduxProps } from 'app/authors/authors.types'
import { AppContext } from 'app/core/AppIndex/App.context'
import { ListRouteProps } from 'app/core/core.types'

import { Button } from 'packages/common'
import { Loader } from 'app/core/components'
import { SimpleAuthorCard } from '../../components/AuthorCard'

import styles from './AuthorsListPage.module.scss'

export type AuthorsListPageProps = {} & ListRouteProps & AuthorsReduxProps

const AuthorsListPage: React.FunctionComponent<AuthorsListPageProps> = ({
  getAuthorsRequestPending,
  getBucketedAuthors,
  history,
}) => {
  const { appInitialized, user } = React.useContext(AppContext)
  const [authorBuckets, setAuthorBuckets] = React.useState(getBucketedAuthors())
  const loading = !appInitialized || getAuthorsRequestPending()

  React.useEffect(() => {
    if (appInitialized) {
      if (user) {
        setAuthorBuckets(getBucketedAuthors())
      } else {
        history.push('/account/login')
      }
    }
  }, [appInitialized, getBucketedAuthors, user]) // eslint-disable-line

  const handleAddAuthorClick = React.useCallback(() => {
    history.push('/authors/new')
  }, []) // eslint-disable-line

  // NOTE: no useCallback() here, because it has to be bound to ID anyway
  const handleAuthorClick = id => {
    history.push(`/authors/${id}`)
  }

  return appInitialized && user ? (
    <div>
      <h2>My Authors</h2>
      <section className={styles.contentWrapper}>
        <Button onClick={handleAddAuthorClick}>Add an Author</Button>

        {authorBuckets.map(bucket => (
          <div
            className={styles.authorBucket}
            key={`authorBucket-${bucket.key}`}
          >
            <div className={styles.authorBucketHeader}>{bucket.key}</div>
            {bucket.values.map(author => (
              <SimpleAuthorCard
                author={author}
                key={author.id}
                onClick={() => handleAuthorClick(author.id)}
              />
            ))}
          </div>
        ))}

        {loading && <Loader size={44} />}
      </section>
    </div>
  ) : null
}

export default React.memo(AuthorsListPage)
