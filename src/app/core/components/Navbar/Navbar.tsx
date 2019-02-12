import * as React from 'react'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.scss'

export type NavbarProps = {}

const Navbar: React.SFC<NavbarProps> = () => (
  <>
    <nav className={styles.navbar}>
      <Link to="/books">Books</Link> | <Link to="/authors">Authors</Link>
    </nav>
    {/* TODO: remove temporary auth routing once the full system is in place */}
    <nav className={styles.navbar}>
      <Link to="/account">Account</Link> |{' '}
      <Link to="/account/login">Login</Link> |{' '}
      <Link to="/account/register">Register</Link>
    </nav>
  </>
)

export { Navbar as UnwrappedNavbar }
export default React.memo(Navbar)
