import * as React from 'react'

import { AuthorsReduxProps } from '../authors.types'

import { useRequiredAuthentication } from 'app/auth/utils/useRequiredAuthentication'

import Button from 'app/common/Button/Button'
import Loader from 'app/common/Loader/Loader'
import AuthorCard from '../components/AuthorCard/AuthorCard'

import styles from './AuthorsListPage.module.scss'

export type AuthorsListPageProps = {
  history: any
} & AuthorsReduxProps

const AuthorsListPage: React.FunctionComponent<AuthorsListPageProps> = ({
  fetchAuthors,
  getAuthorsRequestPending,
  getBucketedAuthors,
  history,
}) => {
  const { getUser } = useRequiredAuthentication(history)
  const [authorBuckets, setAuthorBuckets] = React.useState(getBucketedAuthors())
  const user = getUser()
  const loading = getAuthorsRequestPending()

  React.useEffect(() => {
    if (user && !authorBuckets.length) {
      fetchAuthors(user.id)
    }
  }, [])

  React.useEffect(() => {
    if (user) {
      setAuthorBuckets(getBucketedAuthors())
    }
  }, [getBucketedAuthors])

  function handleAddAuthorClick() {
    history.push('/authors/new')
  }

  function handleAuthorClick(id) {
    history.push(`/authors/${id}`)
  }

  return user ? (
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
              <AuthorCard
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
