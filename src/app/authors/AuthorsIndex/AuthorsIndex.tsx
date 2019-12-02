import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import { AuthorsReduxProps } from 'app/authors/authors.types'

import { ConnectedAuthorCreatePage } from 'app/authors/pages/AuthorCreatePage'
import { AuthorDetailPage } from 'app/authors/pages/AuthorDetailPage/AuthorDetailPage'
import { ConnectedAuthorsListPage } from 'app/authors/pages/AuthorsListPage'

export type AuthorsIndexProps = {} & AuthorsReduxProps

const AuthorsIndex: React.FunctionComponent<AuthorsIndexProps> = props => (
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
      render={routerProps => <AuthorDetailPage {...props} {...routerProps} />}
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

export default React.memo(AuthorsIndex)
