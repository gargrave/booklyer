import * as React from 'react'

import { AuthorBucket } from 'app/authors/authors.types'
import { AppContext } from 'app/core/AppIndex/App.context'
import { ListRouteProps } from 'app/core/core.types'

import { Button } from 'packages/common'

import { ConnectedSimpleAuthorCard as SimpleAuthorCard } from 'app/authors/components/AuthorCard'
import { Loader } from 'app/core/components'

import styles from './AuthorsListPage.module.scss'

export type AuthorsListPageProps = {
  getAuthorsRequestPending: () => boolean
  getBucketedAuthors: () => AuthorBucket[]
} & ListRouteProps

export const AuthorsListPage: React.FC<AuthorsListPageProps> = React.memo(
  ({ getAuthorsRequestPending, getBucketedAuthors, history }) => {
    const { appInitialized, user } = React.useContext(AppContext)

    const loading = !appInitialized || getAuthorsRequestPending()
    const authorBuckets = getBucketedAuthors() ?? []

    React.useEffect(() => {
      if (appInitialized && !user) {
        history.push('/account/login')
      }
    }, [appInitialized, history, user])

    const handleAddAuthorClick = React.useCallback(() => {
      history.push('/authors/new')
    }, [history])

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
  },
)
