import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Author } from '../authors.types'

import AuthorsListPage from '../AuthorsListPage/AuthorsListPage'

export type AuthorsIndexProps = {
  fetchAuthors: () => Promise<Author[]>
  getAuthors: () => Author[]
}

export default class AuthorsIndex extends React.PureComponent<
  AuthorsIndexProps
> {
  get contextValue() {
    return {
      fetchAuthors: this.props.fetchAuthors,
    }
  }

  render() {
    console.log('AuthorsIndex.render()')
    return (
      <Switch>
        <Route
          path="/authors"
          render={() => <AuthorsListPage {...this.props} />} // tslint:disable-line
        />
      </Switch>
    )
  }
}
