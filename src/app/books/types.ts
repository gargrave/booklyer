import { IAuthor } from 'app/authors/types'
import { IResource, ITimestamped } from 'app/core/types'

export interface IBook extends IResource, ITimestamped {
  author: IAuthor
  sortBy: string
  title: string
}
