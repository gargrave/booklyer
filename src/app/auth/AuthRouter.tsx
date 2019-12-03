import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import {
  ConnectedLoginPage,
  ProfilePage,
  ConnectedRegisterPage,
} from 'app/auth/pages'

export const AuthRouter: React.FC = props => (
  <Switch>
    <Route
      exact={true}
      path="/account/login"
      render={routerProps => <ConnectedLoginPage {...props} {...routerProps} />}
    />

    <Route
      exact={true}
      path="/account/register"
      render={routerProps => (
        <ConnectedRegisterPage {...props} {...routerProps} />
      )}
    />

    <Route
      exact={true}
      path="/account"
      render={routerProps => <ProfilePage {...props} {...routerProps} />}
    />

    <Redirect to="/account" />
  </Switch>
)
