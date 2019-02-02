import * as React from 'react'

import styles from './Titlebar.module.scss'

export type TitlebarProps = {
  title: string
}

const Titlebar: React.SFC<TitlebarProps> = ({ title }) => (
  <nav className={styles.titlebar}>
    <li className={styles.title}>{title}</li>
  </nav>
)

export { Titlebar as UnwrappedTitlebar }
export default React.memo(Titlebar)
