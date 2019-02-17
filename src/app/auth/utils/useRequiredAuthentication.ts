import { useAuthentication, AuthenticationOptions } from './useAuthentication'

type RouterHistory = {
  push: (path: string) => void
}

/**
 * A wrapper around the 'useAuthentication' hook that will redirect to login page if user is not logged in.
 */
export const useRequiredAuthentication = (
  history: RouterHistory,
  options: AuthenticationOptions = {} as AuthenticationOptions,
) => {
  const { user } = useAuthentication(options)

  if (!user) {
    setTimeout(() => {
      history.push('account/login')
    }, 0)
  }

  return { user }
}
