import * as React from 'react'

import { AppContext } from 'app/core/AppIndex/App.context'
import { CreateRouteProps } from 'app/core/core.types'
import { BooksReduxProps } from '../../books.types'

import BookForm from '../../components/BookForm/BookForm'

export type BookCreatePageProps = {} & CreateRouteProps & BooksReduxProps

const BookCreatePage: React.FunctionComponent<BookCreatePageProps> = ({
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

export default React.memo(BookCreatePage)
