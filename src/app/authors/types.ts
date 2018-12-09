import { Resource, Timestamped } from 'app/core/types'

export type Author = {
  firstName: string
  lastName: string
} & Resource &
  Timestamped
