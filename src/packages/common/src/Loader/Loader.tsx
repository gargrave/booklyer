import * as React from 'react'
import { classNames } from '@gargrave/garlib'

import ClipLoader from 'react-spinners/ClipLoader'

import styles from './Loader.module.scss'

const LOADER_BASE_COLOR = '#0078ab'

export type LoaderProps = {
  backdropClassName?: string
  size?: number
  transparent?: boolean
}

export const Loader: React.FunctionComponent<LoaderProps> = React.memo(
  ({ backdropClassName = '', size = 16, transparent = false }) => {
    return (
      <div className={styles.loaderWrapper}>
        <div
          className={classNames(styles.backdrop, backdropClassName, {
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
  },
)
