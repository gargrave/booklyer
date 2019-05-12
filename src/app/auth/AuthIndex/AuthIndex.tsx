import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { AuthReduxProps } from '../auth.types'

import LoginPage from '../pages/LoginPage/LoginPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'

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

export default React.memo(AuthIndex)
