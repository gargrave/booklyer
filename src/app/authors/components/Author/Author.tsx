import * as React from 'react'

import { Author as AuthorType } from '../../types'

export type AuthorProps = {
  author: AuthorType
}

const Author: React.SFC<AuthorProps> = ({ author }) => (
  <div>
    <span>
      {author.firstName} {author.lastName}
    </span>
  </div>
)

export default Author
