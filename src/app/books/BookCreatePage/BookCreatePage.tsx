import * as React from 'react'

import { BooksReduxProps } from '../books.types'

import { useRequiredAuthentication } from 'app/auth/utils/useRequiredAuthentication'

import BookForm from '../components/BookForm/BookForm'

export type BookCreatePageProps = { history: any } & BooksReduxProps

const BookCreatePage: React.FunctionComponent<BookCreatePageProps> = ({
  createBook,
  getAuthorsSortedByLastName,
  getBooksRequestPending,
  history,
}) => {
  const { getUser } = useRequiredAuthentication(history)
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(getBooksRequestPending())

  React.useEffect(() => {
    setLoading(getBooksRequestPending())
  }, [getBooksRequestPending])

  const user = getUser()

  const handleSubmit = React.useCallback(
    async payload => {
      try {
        await createBook(user.id, payload)
        history.push('/books')
      } catch (error) {
        setError('There was an error creating the Book.')
      }
    },
    [createBook, user],
  )

  const handleCancel = React.useCallback(() => {
    history.push('/books')
  }, [])

  return user ? (
    <>
      <BookForm
        authors={getAuthorsSortedByLastName()}
        disabled={loading}
        error={error}
        loading={loading}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </>
  ) : null
}

export default React.memo(BookCreatePage)
