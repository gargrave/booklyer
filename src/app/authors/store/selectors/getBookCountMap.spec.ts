import { produce } from 'immer'

import { fullBooksState, fullState } from 'packages/mocks/src/redux'
import { getBookCountMap } from './getBookCountMap'

const state = fullState as any

const getChangedState = () => {
  return produce(state, draft => {
    draft.books.data = { ...fullBooksState.data }
  }) as any
}

describe('getBookCountMap', () => {
  describe('Basic Usage', () => {
    it('returns the correct book-count map', () => {
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
      const result = getBookCountMap(myState as any)
      expect(result).toEqual({
        a: 3,
        b: 1,
        c: 2,
      })
    })

    it('returns an empty object if there are no books', () => {
      const myState = { books: { data: {} } }
      const result = getBookCountMap(myState as any)
      expect(result).toEqual({})
    })
  })

  describe('Memoization', () => {
    it('returns the memoized object reference if nothing pertinent is changed', () => {
      const firstResult = getBookCountMap(state)
      const secondResult = getBookCountMap(state)
      expect(secondResult).toBe(firstResult)
    })

    it('returns a new object if something pertinent is changed', () => {
      const firstResult = getBookCountMap(state)
      const secondResult = getBookCountMap(getChangedState())
      expect(secondResult).not.toBe(firstResult)
    })
  })
})
