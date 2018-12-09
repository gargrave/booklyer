export type FbDoc = {
  id: string
  data: (args?: any) => any
  ref: any
}

export type FbDocRef = {
  delete: (args?: any) => any
  get: (args?: any) => any
  set: (args?: any) => any
  update: (args?: any) => any
}

export type FbCollection = {
  docs: FbDoc[]
}

export type FbError = {
  code: string
  message: string
}

export type FbTimestamp = {
  nanoseconds: number
  seconds: number
  toDate?: () => Date
}
