import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import { BooksReduxProps } from '../books.types'

import BookCreatePage from '../pages/BookCreatePage/BookCreatePage'
import BookDetailPage from '../pages/BookDetailPage/BookDetailPage'
import BooksListPage from '../pages/BooksListPage/BooksListPage'

export type BooksIndexProps = {} & BooksReduxProps

const BooksIndex: React.FunctionComponent<BooksIndexProps> = props => (
  <Switch>
    <Route
      exact={true}
      path="/books/new"
      render={routerProps => <BookCreatePage {...props} {...routerProps} />}
    />

    <Route
      exact={true}
      path="/books/:id"
      render={routerProps => <BookDetailPage {...props} {...routerProps} />}
    />

    <Route
      exact={true}
      path="/books"
      render={routerProps => <BooksListPage {...props} {...routerProps} />}
    />
  </Switch>
)

export default React.memo(BooksIndex)
