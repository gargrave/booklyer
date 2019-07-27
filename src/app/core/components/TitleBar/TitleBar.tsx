import * as React from 'react'
import { Link } from 'react-router-dom'

import styles from './TitleBar.module.scss'

export type TitleBarProps = {
  title: string
}

export const TitleBar: React.FC<TitleBarProps> = React.memo(({ title }) => (
  <nav className={styles.titleBar}>
    <li className={styles.title}>
      <Link to="/">{title}</Link>
    </li>
  </nav>
))
