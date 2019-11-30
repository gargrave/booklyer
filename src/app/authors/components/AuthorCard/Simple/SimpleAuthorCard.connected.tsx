import * as React from 'react'
import { useSelector } from 'react-redux'

import { getBookCountByAuthor } from 'app/authors/store/selectors'

import { SimpleAuthorCard, SimpleAuthorCardProps } from './SimpleAuthorCard'

type MappedProps = 'bookCount'

export type ConnectedSimpleAuthorCardProps = Omit<
  SimpleAuthorCardProps,
  MappedProps
>

export const ConnectedSimpleAuthorCard: React.FC<
  ConnectedSimpleAuthorCardProps
> = props => {
  return (
    <SimpleAuthorCard
      {...props}
      bookCount={useSelector(state =>
        getBookCountByAuthor(state, props.author.id),
      )}
    />
  )
}
