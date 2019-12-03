import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import { AuthRouter } from 'app/auth/AuthRouter'
import { AuthorsRouter } from 'app/authors/AuthorsRouter'
import { BooksRouter } from 'app/books/BooksRouter'
import { ConnectedHomePage as HomePage } from 'app/core/pages/HomePage'

const Router: React.FC = () => (
  <Switch>
    <Route component={AuthRouter} path="/account" />
    <Route component={AuthorsRouter} path="/authors" />
    <Route component={BooksRouter} path="/books" />
    <Route component={HomePage} path="/" />
  </Switch>
)

export default Router
