import * as React from 'react'

import { IAuthor } from '../../types'

export interface IAuthorProps {
  author: IAuthor
}

const Author: React.SFC<IAuthorProps> = ({ author }) => (
  <div>
    <span>
      {author.firstName} {author.lastName}
    </span>
  </div>
)

export default Author
