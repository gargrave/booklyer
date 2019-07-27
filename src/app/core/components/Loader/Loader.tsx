import * as React from 'react'

import {
  Loader as BaseLoader,
  LoaderProps as BaseLoaderProps,
} from 'packages/common'

import styles from './Loader.module.scss'

export type LoaderProps = {} & BaseLoaderProps

export const Loader: React.FC<LoaderProps> = React.memo(props => {
  return <BaseLoader {...props} backdropClassName={styles.backdrop} />
})
