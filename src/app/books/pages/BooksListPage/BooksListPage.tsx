import * as React from 'react'

import { AppContext } from 'app/core/AppIndex/App.context'
import { ListRouteProps } from 'app/core/core.types'
import { BooksReduxProps } from '../../books.types'

import Button from 'packages/common/src/Button/Button'
import Loader from 'packages/common/src/Loader/Loader'
import { SimpleBookCard } from '../../components/BookCard'

import styles from './BooksListPage.module.scss'

export type BooksListPageProps = {} & ListRouteProps & BooksReduxProps

const BooksListPage: React.FunctionComponent<BooksListPageProps> = ({
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

  return appInitialized && user ? (
    <div>
      <h2>My Books</h2>
      <section className={styles.contentWrapper}>
        <Button onClick={handleAddBookClick}>Add a Book</Button>

        {bookBuckets.map(bucket => (
          <div className={styles.bookBucket} key={`bookBucket-${bucket.key}`}>
            <div className={styles.bookBucketHeader}>{bucket.key}</div>
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

export default React.memo(BooksListPage)
