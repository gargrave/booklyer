import { produce } from 'immer'

import { fullBooksState, fullState } from 'packages/mocks/src/redux'
import { BookPropertyNames } from '../../books.types'
import { getBookById } from './getBookById'

const state = fullState as any
const firstBook = Object.values(fullBooksState.data)[0]

const getChangedState = () => {
  return produce(state, draft => {
    draft.books.data = { ...fullBooksState.data }
  }) as any
}

describe('getBookById', () => {
  describe('Basic Usage', () => {
    it('returns the correct record corresponding to the provided ID', () => {
      const result = getBookById(state, firstBook.id)

      expect(result).toBeDefined()
      // yes, we know this is defined at this point; this check is just to make TS happy
      if (result) {
        expect(result.id).toBeDefined()
        // ensure all expected attributes are there
        BookPropertyNames.forEach(attr => {
          expect(result[attr]).toBeDefined()
        })
      }
    })

    it('returns undefined if the provided ID does not exist', () => {
      const result = getBookById(state, 'invalid-id')
      expect(result).toBeUndefined()
    })
  })

  describe('Memoization', () => {
    it('returns the memoized object reference if nothing pertinent is changed', () => {
      const firstResult = getBookById(state, firstBook.id)
      const secondResult = getBookById(state, firstBook.id)
      expect(secondResult).toBe(firstResult)
    })

    it('returns a new object if something pertinent is changed', () => {
      const firstResult = getBookById(state, firstBook.id)
      const secondResult = getBookById(getChangedState(), firstBook.id)
      expect(secondResult).not.toBe(firstResult)
    })
  })
})
