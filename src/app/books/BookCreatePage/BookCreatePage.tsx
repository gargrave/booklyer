import * as React from 'react'

import { BooksReduxProps } from '../books.types'

import { useRequiredAuthentication } from 'app/auth/utils/useRequiredAuthentication'

import BookForm from '../components/BookForm/BookForm'

export type BookCreatePageProps = { history: any } & BooksReduxProps

const BookCreatePage: React.FunctionComponent<BookCreatePageProps> = ({
  createBook,
  history,
}) => {
  const { getUser } = useRequiredAuthentication(history)
  const [error, setError] = React.useState('')
  const user = getUser()

  async function handleSubmit(payload) {
    try {
      await createBook(user.id, payload)
      history.push('/books')
    } catch (error) {
      setError('There was an error creating the Book.')
    }
  }

  function handleCancel() {
    history.push('/books')
  }

  return user ? (
    <>
      <BookForm error={error} onCancel={handleCancel} onSubmit={handleSubmit} />
    </>
  ) : null
}

export default React.memo(BookCreatePage)
