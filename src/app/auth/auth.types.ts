export type UserMetadata = {
  creationTime?: string
  lastSignInTime?: string
}

export const UserMetadataPropertyNames = ['creationTime', 'lastSignInTime']

export type User = {
  id: string
  displayName: string
  email: string
  emailVerified: boolean
} & UserMetadata

export const UserPropertyNames = [
  'displayName',
  'email',
  'emailVerified',
  'uid',
]
