import { useAuthentication, AuthenticationOptions } from './useAuthentication'

type RouterHistory = {
  push: (path: string) => void
}

/**
 * A wrapper around the 'useAuthentication' hook that will redirect to the specified page if the user is logged in.
 */
export const useUnauthenticated = (
  history: RouterHistory,
  redirectTo: string = '/',
  options: AuthenticationOptions = {} as AuthenticationOptions,
) => {
  const { getUser } = useAuthentication(options)

  if (getUser()) {
    setTimeout(() => {
      history.push(redirectTo)
    }, 0)
  }

  return { getUser }
}
