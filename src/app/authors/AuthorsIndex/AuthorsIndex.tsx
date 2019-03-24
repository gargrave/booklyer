import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import { AuthorsReduxProps } from '../authors.types'

import AuthorCreatePage from '../AuthorCreatePage/AuthorCreatePage'
import AuthorDetailPage from '../AuthorDetailPage/AuthorDetailPage'
import AuthorsListPage from '../AuthorsListPage/AuthorsListPage'

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
      render={routerProps => <AuthorsListPage {...props} {...routerProps} />}
    />
  </Switch>
)

export default React.memo(AuthorsIndex)
