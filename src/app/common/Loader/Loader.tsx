import * as React from 'react'
import classNames from 'classnames'

import ClipLoader from 'react-spinners/ClipLoader'

import styles from './Loader.module.scss'

const LOADER_BASE_COLOR = '#0078ab'

export type LoaderProps = {
  size?: number
  transparent?: boolean
}

const Loader: React.FunctionComponent<LoaderProps> = ({
  size = 16,
  transparent = false,
}) => {
  return (
    <div className={styles.loaderWrapper}>
      <div
        className={classNames(styles.backdrop, {
          [styles.transparent]: transparent,
        })}
      />

      <ClipLoader
        className={styles.loader}
        color={LOADER_BASE_COLOR}
        size={size}
      />
    </div>
  )
}

export default React.memo(Loader)
