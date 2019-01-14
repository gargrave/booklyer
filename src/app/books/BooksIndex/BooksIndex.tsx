import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import { BooksReduxProps } from '../books.types'

import BooksListPage from '../BooksListPage/BooksListPage'

export type BooksIndexProps = {} & BooksReduxProps

export default class BooksIndex extends React.PureComponent<BooksIndexProps> {
  render() {
    return (
      <Switch>
        <Route
          path="/books"
          render={() => <BooksListPage {...this.props} />} // tslint:disable-line
        />
      </Switch>
    )
  }
}
