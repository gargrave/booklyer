import * as React from 'react'

import { Author, AuthorsReduxProps } from '../authors.types'

import { useRequiredAuthentication } from 'app/auth/utils/useRequiredAuthentication'

import Button from 'app/common/Button/Button'
import AuthorCard from '../components/AuthorCard/AuthorCard'

export type AuthorsListPageProps = {
  history: any
} & AuthorsReduxProps

const AuthorsListPage: React.FunctionComponent<AuthorsListPageProps> = ({
  fetchAuthors,
  getAuthors,
  history,
}) => {
  const { user } = useRequiredAuthentication(history)
  const [authors, setAuthors] = React.useState([] as Author[])

  const initializeAuthors = async () => {
    const fetchedAuthors = getAuthors()
    if (!fetchedAuthors.length) {
      await fetchAuthors()
    } else {
      setAuthors(fetchedAuthors)
    }
  }

  React.useEffect(() => {
    if (user) {
      initializeAuthors()
    }
  }, [])

  React.useEffect(() => {
    if (user) {
      setAuthors(getAuthors())
    }
  }, [getAuthors])

  return user ? (
    <div>
      <h2>My Authors</h2>
      <Button onClick={() => void 0}>Add an Author</Button>
      {authors.map(author => (
        <AuthorCard author={author} key={author.id} />
      ))}
    </div>
  ) : null
}

export default React.memo(AuthorsListPage)
