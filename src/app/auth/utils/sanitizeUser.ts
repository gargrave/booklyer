import pick from 'lodash/pick'

import {
  UserMetadata,
  UserMetadataPropertyNames,
  UserPropertyNames,
} from '../auth.types'

const sanitizeUser = rawUser => {
  if (!rawUser) {
    return null
  }

  const userData = { ...pick(rawUser, UserPropertyNames) }
  const userMeta: UserMetadata = {
    ...pick(rawUser.metadata, UserMetadataPropertyNames),
  }

  const user = {
    ...userData,
    ...userMeta,
  }

  // for consistency's sake, rename 'uid' to 'id'
  user.id = user.uid
  delete user.uid

  return user
}

export { sanitizeUser }
