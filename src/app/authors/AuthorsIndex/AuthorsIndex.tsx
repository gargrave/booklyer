import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import { AuthorsReduxProps } from '../authors.types'

import AuthorsListPage from '../AuthorsListPage/AuthorsListPage'

export type AuthorsIndexProps = {} & AuthorsReduxProps

const AuthorsIndex: React.FunctionComponent<AuthorsIndexProps> = props => (
  <Switch>
    <Route
      path="/authors"
      render={({ history }) => <AuthorsListPage history={history} {...props} />}
    />
  </Switch>
)

export default React.memo(AuthorsIndex)
