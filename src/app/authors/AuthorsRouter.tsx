import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  ConnectedAuthorCreatePage,
  ConnectedAuthorDetailPage,
  ConnectedAuthorsListPage,
} from 'app/authors/pages'

export const AuthorsRouter = props => (
  <Switch>
    <Route
      exact={true}
      path="/authors/new"
      render={routerProps => (
        <ConnectedAuthorCreatePage {...props} {...routerProps} />
      )}
    />

    <Route
      exact={true}
      path="/authors/:id"
      render={routerProps => (
        <ConnectedAuthorDetailPage {...props} {...routerProps} />
      )}
    />

    <Route
      exact={true}
      path="/authors"
      render={routerProps => (
        <ConnectedAuthorsListPage {...props} {...routerProps} />
      )}
    />
  </Switch>
)
