/* eslint-disable @typescript-eslint/no-explicit-any */
export type FbDoc = {
  data: (args?: any) => any
  id: string
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
  name: string
}
