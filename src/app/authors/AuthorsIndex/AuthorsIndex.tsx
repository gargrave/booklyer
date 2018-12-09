import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import AuthorsListPage from '../AuthorsListPage/AuthorsListPage'

export type AuthorsIndexProps = {}

export default class AuthorsIndex extends React.PureComponent<
  AuthorsIndexProps
> {
  render() {
    return (
      <Switch>
        <Route component={AuthorsListPage} path="/authors" />
      </Switch>
    )
  }
}
