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
  getAuthors,
  getAuthorsRequestPending,
  history,
}) => {
  const { getUser } = useRequiredAuthentication(history)
  const [authors, setAuthors] = React.useState(getAuthors())
  const user = getUser()
  const loading = getAuthorsRequestPending()

  React.useEffect(() => {
    if (user && !authors.length) {
      fetchAuthors(user.id)
    }
  }, [])

  React.useEffect(() => {
    if (user) {
      setAuthors(getAuthors())
    }
  }, [getAuthors])

  function handleAddAuthorClick() {
    history.push('/authors/new')
  }

  return user ? (
    <div>
      <h2>My Authors</h2>
      <section className={styles.contentWrapper}>
        <Button onClick={handleAddAuthorClick}>Add an Author</Button>
        {authors.map(author => (
          <AuthorCard author={author} key={author.id} />
        ))}
        {loading && <Loader size={44} />}
      </section>
    </div>
  ) : null
}

export default React.memo(AuthorsListPage)
