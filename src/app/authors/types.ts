import { IResource, ITimestamped } from 'app/core/types'

export interface IAuthor extends IResource, ITimestamped {
  firstName: string
  lastName: string
}
