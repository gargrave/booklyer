import { Book } from '../../books.types'

// removes words that should not be considered when sorting
const sanitize = (str: string): string => str.replace(/^(the|an|a)\s*/i, '')

/**
 * Custom Book sorting function.
 * Will sort by the optional `sortBy` field if it is present; otherwise it will sort by `title`.
 * Note that this sorter also ignore common title words like "The", "An", and "a"
 * @param a
 * @param b
 */
export const sortByCustomOrTitle = (a: Book, b: Book) => {
  const keyA = sanitize(a.sortBy || a.title)
  const keyB = sanitize(b.sortBy || b.title)
  return keyA > keyB ? 1 : -1
}
