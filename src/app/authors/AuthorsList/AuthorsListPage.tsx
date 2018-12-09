import * as React from 'react'

import { Author as AuthorType } from '../types'

import Author from '../components/Author/Author'

export type AuthorsListPageProps = {
  authors: AuthorType[]
}

export default class AuthorsListPage extends React.Component<
  AuthorsListPageProps
> {
  static defaultProps = {
    authors: [],
  }

  render() {
    const { authors } = this.props
    return (
      <div>
        <h2>AuthorsListPage</h2>
        {authors.map(author => (
          <Author author={author} key={author.id} />
        ))}
      </div>
    )
  }
}
