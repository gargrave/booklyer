import * as React from 'react'
import classNames from 'classnames'

import styles from './CardTextLine.module.scss'

export enum CardTextLineType {
  Subtext = 'subtext',
  Text = 'text',
  Title = 'title',
}

export type CardTextLineProps = {
  /** The text to display within the line. */
  text: string
  /**
   * The type/styling to apply to this instance.
   *
   * Use the `CardTextLineType` enum to specify this prop.
   */
  type?: CardTextLineType
}

/**
 * A simple helper to display a nicely-formatted single line of text within a card.
 */
export const CardTextLine: React.FC<CardTextLineProps> = React.memo(
  ({ text, type = CardTextLineType.Text }) => {
    return (
      <div className={classNames(styles.cardTextLine, styles[type])}>
        {text}
      </div>
    )
  },
)
