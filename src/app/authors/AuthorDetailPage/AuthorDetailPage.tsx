import * as React from 'react'

export type AuthorDetailPageProps = {
  history: any
}

const AuthorDetailPage: React.FunctionComponent<AuthorDetailPageProps> = ({
  history,
}) => {
  return <div>Hello, AuthorDetailPage!</div>
}

export default React.memo(AuthorDetailPage)
