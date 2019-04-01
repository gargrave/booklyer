import { FbError } from 'utils/firebase.types'
import { RouteComponentProps } from 'react-router'

export const GenericResourcePropertyNames = ['id', 'created', 'updated']

export type Resource = {
  id: string
}

export type Timestamped = {
  created: Date
  updated: Date
}

export type ReduxActionPayload = {
  error?: FbError
}

export type ReduxAction<T> = {
  payload: T
  type: string
}

export type ListRouteProps = RouteComponentProps
export type DetailRouteProps = RouteComponentProps<{ id: string }>
export type CreateRouteProps = RouteComponentProps
