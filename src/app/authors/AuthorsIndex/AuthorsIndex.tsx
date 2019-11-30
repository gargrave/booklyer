import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import { AuthorsReduxProps } from '../authors.types'

import AuthorCreatePage from '../pages/AuthorCreatePage/AuthorCreatePage'
import { AuthorDetailPage } from '../pages/AuthorDetailPage/AuthorDetailPage'
import { ConnectedAuthorsListPage } from '../pages/AuthorsListPage'

export type AuthorsIndexProps = {} & AuthorsReduxProps

const AuthorsIndex: React.FunctionComponent<AuthorsIndexProps> = props => (
  <Switch>
    <Route
      exact={true}
      path="/authors/new"
      render={routerProps => <AuthorCreatePage {...props} {...routerProps} />}
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
