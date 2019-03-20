import * as React from 'react'
import { Link } from 'react-router-dom'

import { useAuthentication } from 'app/auth/utils/useAuthentication'

import styles from './Navbar.module.scss'

export type NavbarProps = {}

const Navbar: React.FunctionComponent<NavbarProps> = () => {
  const { getUser } = useAuthentication()
  const user = getUser()

  return (
    <>
      {user && (
        <nav className={styles.navbar}>
          <Link to="/books">Books</Link> | <Link to="/authors">Authors</Link> |{' '}
          <Link to="/account">Account</Link>
        </nav>
      )}

      {!user && (
        <nav className={styles.navbar}>
          <Link to="/account/login">Login</Link> |{' '}
          <Link to="/account/register">Register</Link>
        </nav>
      )}
    </>
  )
}

export default React.memo(Navbar)
