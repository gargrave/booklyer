import * as React from 'react'

import { IAuthor } from '../types'

import { mockAuthors } from 'api/mocks/authors.mocks'

import Author from '../components/Author/Author'

export interface IAuthorsListPageProps {
  authors: IAuthor[]
}

export default class AuthorsListPage extends React.Component<
  IAuthorsListPageProps
> {
  static defaultProps = {
    authors: [...mockAuthors],
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
