/* eslint-disable @typescript-eslint/no-explicit-any */
export type FbDoc = {
  data: (args?: any) => any
  id: string
  ref: any
}

export type FbCollection = {
  docs: FbDoc[]
}
