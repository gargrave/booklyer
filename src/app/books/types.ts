import { Author } from 'app/authors/types'
import { Resource, Timestamped } from 'app/core/types'

export type Book = {
  author: Author
  sortBy: string
  title: string
} & Resource &
  Timestamped
