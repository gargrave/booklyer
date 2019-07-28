import { getBookCountByAuthor } from './getBookCountByAuthor'

describe('getBookCountByAuthor', () => {
  describe('Basic Usage', () => {
    it('returns the correct count for the specified author', () => {
      const myState = {
        books: {
          data: {
            a: { authorId: 'c' },
            b: { authorId: 'b' },
            c: { authorId: 'a' },
            d: { authorId: 'c' },
            e: { authorId: 'a' },
            f: { authorId: 'a' },
          },
        },
      }
      const result = getBookCountByAuthor(myState as any, 'c')
      expect(result).toBe(2)
    })

    it('returns 0 if there are no books from the specified author', () => {
      const myState = { books: { data: { a: { authorId: 'otherAuthor' } } } }
      const result = getBookCountByAuthor(myState as any, 'missing-id')
      expect(result).toBe(0)
    })
  })
})
