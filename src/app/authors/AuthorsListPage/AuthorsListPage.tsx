import * as React from 'react'

import { Author, AuthorsReduxProps } from '../authors.types'

import Button from 'app/common/Button/Button'
import AuthorCard from '../components/AuthorCard/AuthorCard'

export type AuthorsListPageProps = {} & AuthorsReduxProps

export type AuthorsListPageState = {
  authors: Author[]
}

const AuthorsListPage: React.FunctionComponent<AuthorsListPageProps> = ({
  fetchAuthors,
  getAuthors,
}) => {
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
    initializeAuthors()
  }, [])

  React.useEffect(() => {
    setAuthors(getAuthors())
  }, [getAuthors])

  return (
    <div>
      <h2>Authors List</h2>
      <Button onClick={() => void 0}>Add an Author</Button>
      {authors.map(author => (
        <AuthorCard author={author} key={author.id} />
      ))}
    </div>
  )
}

export default React.memo(AuthorsListPage)
