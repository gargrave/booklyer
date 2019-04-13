import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import AuthContainer from 'app/auth/AuthIndex/AuthContainer'
import AuthorsIndexContainer from 'app/authors/AuthorsIndex/AuthorsIndexContainer'
import BooksIndexContainer from 'app/books/BooksIndex/BooksIndexContainer'
import { HomePageContainer } from './pages/HomePage'

const Router: React.SFC = () => (
  <Switch>
    <Route component={AuthContainer} path="/account" />
    <Route component={AuthorsIndexContainer} path="/authors" />
    <Route component={BooksIndexContainer} path="/books" />
    <Route component={HomePageContainer} path="/" />
  </Switch>
)

export default Router
