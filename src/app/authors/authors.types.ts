import {
  GenericResourcePropertyNames,
  Resource,
  Timestamped,
} from 'app/core/core.types'
import { ObjectIdMap } from 'utils/firestore.helpers'

export const AuthorPropertyNames = [
  ...GenericResourcePropertyNames,
  'firstName',
  'lastName',
]

export type Author = {
  firstName: string
  lastName: string
} & Resource &
  Timestamped

export type AuthorIdMap = ObjectIdMap<Author>

export type AuthorsReduxProps = {
  fetchAuthors: (ownerId: string) => Promise<Author[]>
  getAuthors: () => Author[]
}
