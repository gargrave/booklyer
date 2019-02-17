import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import { BooksReduxProps } from '../books.types'

import BooksListPage from '../BooksListPage/BooksListPage'

export type BooksIndexProps = {} & BooksReduxProps

const BooksIndex: React.FunctionComponent<BooksIndexProps> = props => (
  <Switch>
    <Route
      path="/books"
      render={({ history }) => <BooksListPage history={history} {...props} />}
    />
  </Switch>
)

export default React.memo(BooksIndex)
