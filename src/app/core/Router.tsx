import * as React from 'react'
import { RouteProps } from 'react-router'
import { Route, Switch } from 'react-router-dom'

import authorsRoutes from 'app/authors/authors.routes'
import booksRoutes from 'app/books/books.routes'

const routes: RouteProps[] = [...authorsRoutes, ...booksRoutes]

const Router: React.SFC = () => (
  <Switch>
    {routes.map((route, i) => (
      <Route
        component={route.component}
        exact={route.exact}
        key={i}
        path={route.path}
      />
    ))}
  </Switch>
)

export default Router
