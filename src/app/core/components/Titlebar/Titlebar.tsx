import * as React from 'react'

import styles from './Titlebar.module.scss'
import { Link } from 'react-router-dom'

export type TitlebarProps = {
  title: string
}

const Titlebar: React.SFC<TitlebarProps> = ({ title }) => (
  <nav className={styles.titlebar}>
    <li className={styles.title}>
      <Link to="/">{title}</Link>
    </li>
  </nav>
)

export { Titlebar as UnwrappedTitlebar }
export default React.memo(Titlebar)
