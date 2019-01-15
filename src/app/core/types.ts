export type Resource = {
  id: string
}

export type Timestamped = {
  created: Date
  updated: Date
}

export type ReduxAction = {
  payload: any
  type: string
}
