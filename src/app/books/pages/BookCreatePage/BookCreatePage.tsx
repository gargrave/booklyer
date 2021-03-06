import * as React from 'react'

import { Author } from 'app/authors/authors.types'
import { Book } from 'app/books/books.types'
import { AppContext } from 'app/core/AppIndex/App.context'
import { CreateRouteProps } from 'app/core/core.types'

import BookForm from 'app/books/components/BookForm/BookForm'

export type BookCreatePageProps = {
  createBook: (ownerId: string, book: Book) => Promise<Book[]>
  getAuthorsSortedByLastName: () => Author[]
  getBooksRequestPending: () => boolean
} & CreateRouteProps

export const BookCreatePage: React.FunctionComponent<BookCreatePageProps> = ({
  createBook,
  getAuthorsSortedByLastName,
  getBooksRequestPending,
  history,
}) => {
  const { appInitialized, user } = React.useContext(AppContext)
  const [error, setError] = React.useState('')
  const loading = !appInitialized || getBooksRequestPending()

  React.useEffect(() => {
    if (appInitialized && !user) {
      history.push('/account/login')
    }
  }, [appInitialized, user]) // eslint-disable-line

  const handleSubmit = React.useCallback(
    async payload => {
      try {
        if (user) {
          setError('')
          await createBook(user.id, payload)
          history.push('/books')
        }
      } catch (error) {
        setError('There was an error creating the Book.')
      }
    },
    [createBook, user], // eslint-disable-line
  )

  const handleCancel = React.useCallback(() => {
    history.push('/books')
  }, []) // eslint-disable-line

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
