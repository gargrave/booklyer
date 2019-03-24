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
      render={({ history }) => (
        <AuthorCreatePage history={history} {...props} />
      )}
    />

    <Route
      exact={true}
      path="/authors/:id"
      render={({ history }) => (
        <AuthorDetailPage history={history} {...props} />
      )}
    />

    <Route
      exact={true}
      path="/authors"
      render={({ history }) => <AuthorsListPage history={history} {...props} />}
    />
  </Switch>
)

export default React.memo(AuthorsIndex)
