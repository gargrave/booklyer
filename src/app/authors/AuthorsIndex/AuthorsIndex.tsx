import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Author, AuthorsReduxProps } from '../authors.types'

import AuthorsListPage from '../AuthorsListPage/AuthorsListPage'

export type AuthorsIndexProps = {} & AuthorsReduxProps

export default class AuthorsIndex extends React.PureComponent<
  AuthorsIndexProps
> {
  render() {
    return (
      <Switch>
        <Route
          path="/authors"
          render={() => <AuthorsListPage {...this.props} />} // tslint:disable-line
        />
      </Switch>
    )
  }
}