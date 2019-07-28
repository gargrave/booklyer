import { AppState } from '../../../../store/reducers'
import { getBookCountMap } from './getBookCountMap'

/**
 * Returns the number of books by the author specified by `authorId`, or
 * 0 if the author does not have any books.
 *
 * Note that this selector is not memoized, since it is simply pulling a value
 * from the memoized `bookCountMap` object.
 *
 * @param state
 * @param authorId
 */
export const getBookCountByAuthor = (
  state: AppState,
  authorId: string,
): number => {
  const bookCountMap = getBookCountMap(state)
  return bookCountMap[authorId] || 0
}
