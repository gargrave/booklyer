import { Resource, Timestamped } from 'app/core/types'
import { ObjectIdMap } from 'utils/firestore.helpers'

export type Author = {
  firstName: string
  lastName: string
} & Resource &
  Timestamped

export type AuthorIdMap = ObjectIdMap<Author>

export type AuthorsReduxProps = {
  fetchAuthors: () => Promise<Author[]>
  getAuthors: () => Author[]
}
