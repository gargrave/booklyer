import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  ConnectedBookCreatePage,
  ConnectedBookDetailPage,
  ConnectedBooksListPage,
} from 'app/books/pages'

export const BooksRouter = props => (
  <Switch>
    <Route
      exact={true}
      path="/books/new"
      render={routerProps => (
        <ConnectedBookCreatePage {...props} {...routerProps} />
      )}
    />

    <Route
      exact={true}
      path="/books/:id"
      render={routerProps => (
        <ConnectedBookDetailPage {...props} {...routerProps} />
      )}
    />

    <Route
      exact={true}
      path="/books"
      render={routerProps => (
        <ConnectedBooksListPage {...props} {...routerProps} />
      )}
    />
  </Switch>
)
