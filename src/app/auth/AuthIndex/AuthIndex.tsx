import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { AuthReduxProps } from '../auth.types'

import LoginPage from '../LoginPage/LoginPage'
import ProfilePage from '../ProfilePage/ProfilePage'
import RegisterPage from '../RegisterPage/RegisterPage'

export type AuthIndexProps = {} & AuthReduxProps

const AuthIndex: React.SFC<AuthIndexProps> = props => (
  <Switch>
    <Route
      exact={true}
      path="/account/login"
      render={routerProps => <LoginPage {...props} {...routerProps} />}
    />

    <Route
      exact={true}
      path="/account/register"
      render={routerProps => <RegisterPage {...props} {...routerProps} />}
    />

    <Route
      exact={true}
      path="/account"
      render={routerProps => <ProfilePage {...props} {...routerProps} />}
    />

    <Redirect to="/account" />
  </Switch>
)

export { AuthIndex as UnwrappedAuthIndex }
export default React.memo(AuthIndex)
