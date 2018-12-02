export interface IResource {
  id: string
}

export interface ITimestamped {
  created: Date
  updated: Date
}

export interface IReduxAction {
  type: string
}
