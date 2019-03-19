import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { AuthReduxProps } from '../auth.types'

import LoginPage from '../LoginPage/LoginPage'
import ProfilePage from '../ProfilePage/ProfilePage'
import RegisterPage from '../RegisterPage/RegisterPage'

export type AuthIndexProps = {} & AuthReduxProps

// tslint:disable jsx-no-lambda
const AuthIndex: React.SFC<AuthIndexProps> = props => (
  <Switch>
    <Route
      exact={true}
      path="/account/login"
      render={({ history }) => <LoginPage {...props} history={history} />}
    />

    <Route
      exact={true}
      path="/account/register"
      render={({ history }) => <RegisterPage {...props} history={history} />}
    />

    <Route
      exact={true}
      path="/account"
      render={({ history }) => <ProfilePage {...props} history={history} />}
    />

    <Redirect to="/account" />
  </Switch>
)

export { AuthIndex as UnwrappedAuthIndex }
export default React.memo(AuthIndex)
