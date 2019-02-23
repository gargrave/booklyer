import * as React from 'react'

import { AuthorsReduxProps } from '../authors.types'

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
  const { getUser } = useRequiredAuthentication(history)
  const [authors, setAuthors] = React.useState(getAuthors())
  const user = getUser()

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
      <Button onClick={handleAddAuthorClick}>Add an Author</Button>
      {authors.map(author => (
        <AuthorCard author={author} key={author.id} />
      ))}
    </div>
  ) : null
}

export default React.memo(AuthorsListPage)
