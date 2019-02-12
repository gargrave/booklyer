import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import LoginPage from '../LoginPage/LoginPage'
import ProfilePage from '../ProfilePage/ProfilePage'
import RegisterPage from '../RegisterPage/RegisterPage'

export type AuthIndexProps = {}

// tslint:disable jsx-no-lambda
const AuthIndex: React.SFC<AuthIndexProps> = props => (
  <Switch>
    <Route
      exact={true}
      path="/account/login"
      render={() => <LoginPage {...props} />}
    />

    <Route
      exact={true}
      path="/account/register"
      render={() => <RegisterPage {...props} />}
    />

    <Route
      exact={true}
      path="/account"
      render={() => <ProfilePage {...props} />}
    />

    <Redirect to="/account" />
  </Switch>
)

export { AuthIndex as UnwrappedAuthIndex }
export default React.memo(AuthIndex)
