import * as React from 'react'
import { useSelector } from 'react-redux'

import {
  getAuthorsRequestPending,
  getBucketedAuthors,
} from 'app/authors/store/selectors'

import { AuthorsListPage, AuthorsListPageProps } from './AuthorsListPage'

type MappedProps = 'getAuthorsRequestPending' | 'getBucketedAuthors'

export type ConnectedAuthorsListPageProps = Omit<
  AuthorsListPageProps,
  MappedProps
>

export const ConnectedAuthorsListPage: React.FC<
  ConnectedAuthorsListPageProps
> = props => (
  <AuthorsListPage
    {...props}
    authorBuckets={useSelector(getBucketedAuthors)}
    authorsRequestPending={useSelector(getAuthorsRequestPending)}
  />
)
