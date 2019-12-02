import * as React from 'react'
import get from 'lodash/get'

import { BookBucket } from 'app/books/books.types'
import { AppContext } from 'app/core/AppIndex/App.context'
import { ListRouteProps } from 'app/core/core.types'

import { Button } from 'packages/common'
import { SimpleBookCard } from 'app/books/components/BookCard'
import { Loader } from 'app/core/components'

import styles from './BooksListPage.module.scss'

export type BooksListPageProps = {
  getBooksRequestPending: () => boolean
  getBucketedBooks: () => BookBucket[]
} & ListRouteProps

export const BooksListPage: React.FunctionComponent<BooksListPageProps> = ({
  getBooksRequestPending,
  getBucketedBooks,
  history,
}) => {
  const { appInitialized, user } = React.useContext(AppContext)
  const [bookBuckets, setBookBuckets] = React.useState(getBucketedBooks())
  const loading = !appInitialized || getBooksRequestPending()

  React.useEffect(() => {
    if (appInitialized) {
      if (user) {
        setBookBuckets(getBucketedBooks())
      } else {
        history.push('/account/login')
      }
    }
  }, [appInitialized, getBucketedBooks, user]) // eslint-disable-line

  const handleAddBookClick = React.useCallback(() => {
    history.push('/books/new')
  }, [history])

  // NOTE: no useCallback here, because it has to be bound to ID anyway
  const handleBookClick = (id: string) => {
    history.push(`/books/${id}`)
  }

  const handleBucketHeaderClick = (bucket: BookBucket) => {
    const authorId = get(Object.values(bucket.values), '[0].author.id')
    if (authorId) {
      history.push(`/authors/${authorId}`)
    }
  }

  return appInitialized && user ? (
    <div>
      <h2>My Books</h2>
      <section className={styles.contentWrapper}>
        <Button onClick={handleAddBookClick}>Add a Book</Button>

        {bookBuckets.map(bucket => (
          <div className={styles.bookBucket} key={`bookBucket-${bucket.key}`}>
            <div className={styles.bookBucketHeader}>
              <a
                className={styles.authorLink}
                onClick={() => handleBucketHeaderClick(bucket)}
              >
                {bucket.key}
              </a>
            </div>

            {bucket.values.map(book => (
              <SimpleBookCard
                book={book}
                key={book.id}
                onClick={() => handleBookClick(book.id)}
                showAuthor={false}
              />
            ))}
          </div>
        ))}

        {loading && <Loader size={44} />}
      </section>
    </div>
  ) : null
}
