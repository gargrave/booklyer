import * as React from 'react'

import styles from './CardTextList.module.scss'

export type CardTextListItem = {
  title?: string
  text?: string
}

export type CardTextListProps = {
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
