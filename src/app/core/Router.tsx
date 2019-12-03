import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import { AuthRouter } from 'app/auth/AuthRouter'
import { AuthorsRouter } from 'app/authors/AuthorsRouter'
import { BooksRouter } from 'app/books/BooksRouter'
import { HomePageContainer } from './pages/HomePage'

const Router: React.FC = () => (
  <Switch>
    <Route component={AuthRouter} path="/account" />
    <Route component={AuthorsRouter} path="/authors" />
    <Route component={BooksRouter} path="/books" />
    <Route component={HomePageContainer} path="/" />
  </Switch>
)

export default Router
