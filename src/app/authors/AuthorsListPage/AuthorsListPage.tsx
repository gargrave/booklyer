import * as React from 'react'

import { Author } from '../authors.types'

import AuthorComponent from '../components/Author/Author'

const initialState = (): AuthorsListPageState => ({
  authors: [] as Author[],
})

export type AuthorsListPageProps = {
  fetchAuthors: () => Promise<Author[]>
  getAuthors: () => Author[]
}

export type AuthorsListPageState = {
  authors: Author[]
}

export default class AuthorsListPage extends React.Component<
  AuthorsListPageProps,
  AuthorsListPageState
> {
  static defaultProps = {
    authors: [],
  }

  state = initialState()

  async componentDidMount() {
    let authors = this.props.getAuthors()
    if (!authors.length) {
      await this.props.fetchAuthors()
      authors = this.props.getAuthors()
    }
    this.setState({ authors })
  }

  render() {
    const { authors } = this.state
    return (
      <div>
        <h2>Authors List</h2>
        {authors.map(author => (
          <AuthorComponent author={author} key={author.id} />
        ))}
      </div>
    )
  }
}
