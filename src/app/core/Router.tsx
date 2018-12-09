import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import AuthorsIndexContainer from 'app/authors/AuthorsIndex/AuthorsIndexContainer'
import BooksListContainer from 'app/books/BooksListPage/BooksListContainer'

const Router: React.SFC = () => (
  <Switch>
    <Route component={AuthorsIndexContainer} path="/authors" />
    <Route component={BooksListContainer} path="/books" />
  </Switch>
)

export default Router
