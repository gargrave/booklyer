import pick from 'lodash/pick'

import {
  User,
  UserMetadata,
  UserMetadataPropertyNames,
  UserPropertyNames,
} from '../auth.types'

const sanitizeUser = (rawUser): User | undefined => {
  if (!rawUser) return undefined

  const userData = { ...pick(rawUser, UserPropertyNames) }
  const userMeta: UserMetadata = {
    ...pick(rawUser.metadata, UserMetadataPropertyNames),
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = {
    ...userData,
    ...userMeta,
  }

  // for consistency's sake, rename 'uid' to 'id'
  user.id = user.uid
  delete user.uid

  return user as User
}

export { sanitizeUser }
