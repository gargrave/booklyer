import * as React from 'react'

import { Author, AuthorsReduxProps } from '../authors.types'

import Button from 'app/common/Button/Button'
import AuthorCard from '../components/AuthorCard/AuthorCard'

const initialState = (): AuthorsListPageState => ({
  authors: [] as Author[],
})

export type AuthorsListPageProps = {} & AuthorsReduxProps

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
      // TODO: show a loading state here
      await this.props.fetchAuthors()
      authors = this.props.getAuthors()
      // TODO: handle API errors here
    }
    this.setState({ authors })
  }

  render() {
    const { authors } = this.state
    return (
      <div>
        <h2>Authors List</h2>

        <Button>Add an Author</Button>

        {authors.map(author => (
          <AuthorCard author={author} key={author.id} />
        ))}
      </div>
    )
  }
}
