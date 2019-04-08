import { RouteComponentProps } from 'react-router'

export const GenericResourcePropertyNames = ['id', 'created', 'updated']

export type Resource = {
  id: string
}

export type Timestamped = {
  created: Date
  updated: Date
}

export type BasicRouteProps = RouteComponentProps
export type ListRouteProps = RouteComponentProps
export type DetailRouteProps = RouteComponentProps<{ id: string }>
export type CreateRouteProps = RouteComponentProps
