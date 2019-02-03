import * as React from 'react'

import styles from './CardTextList.module.scss'

export type CardTextListItem = {
  title?: string
  text?: string
}

export type CardTextListProps = {
  /**
   * The collection of items to display. Each item should be an object with two optional properties:
   *
   * - `title`, when present, will be shown in bold with a trailing colon
   * - `text`, when present, will be shown as basic text, and placed after `title` if it is present
   */
  textList: CardTextListItem[]
}

const CardTextList: React.SFC<CardTextListProps> = ({ textList }) => (
  <>
    {textList.map((item, idx) => (
      <div className={styles.item} key={idx}>
        {item.title && <span className={styles.itemTitle}>{item.title}: </span>}
        {item.text}
      </div>
    ))}
  </>
)

export { CardTextList as UnwrappedCardTextList }
export default React.memo(CardTextList)
