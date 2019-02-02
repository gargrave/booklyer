import * as React from 'react'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.scss'

export type NavbarProps = {}

const Navbar: React.SFC<NavbarProps> = () => (
  <nav className={styles.navbar}>
    <Link to="/books">Books</Link> | <Link to="/authors">Authors</Link>
  </nav>
)

export { Navbar as UnwrappedNavbar }
export default React.memo(Navbar)
