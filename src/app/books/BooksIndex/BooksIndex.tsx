import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import { BooksReduxProps } from '../books.types'

import BookCreatePage from '../BookCreatePage/BookCreatePage'
import BooksListPage from '../BooksListPage/BooksListPage'

export type BooksIndexProps = {} & BooksReduxProps

const BooksIndex: React.FunctionComponent<BooksIndexProps> = props => (
  <Switch>
    <Route
      exact={true}
      path="/books/new"
      render={({ history }) => <BookCreatePage history={history} {...props} />}
    />

    <Route
      exact={true}
      path="/books"
      render={({ history }) => <BooksListPage history={history} {...props} />}
    />
  </Switch>
)

export default React.memo(BooksIndex)
