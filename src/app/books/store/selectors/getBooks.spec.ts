import { produce } from 'immer'

import { fullBooksState, fullState } from 'packages/mocks/src/redux'
import { getBooks } from './getBooks'
import { BookPropertyNames } from '../../books.types'

const state = fullState as any

const getChangedState = () => {
  return produce(state, draft => {
    draft.books.data = { ...fullBooksState.data }
  }) as any
}

describe('getBooks', () => {
  describe('Basic Usage', () => {
    it('returns the fully-populated data from the store', () => {
      const records = getBooks(state as any)
      expect(records.length).toBe(Object.keys(fullBooksState.data).length)

      records.forEach(record => {
        expect(record.id).toBeDefined()
        // ensure all expected attributes are there
        BookPropertyNames.forEach(attr => {
          expect(record[attr]).toBeDefined()
        })
      })
    })
  })

  describe('Memoization', () => {
    it('returns the memoized object reference if nothing pertinent is changed', () => {
      const firstResult = getBooks(state)
      const secondResult = getBooks(state)
      expect(secondResult).toBe(firstResult)
    })

    it('returns a new object if something pertinent is changed', () => {
      const firstResult = getBooks(state)
      const secondResult = getBooks(getChangedState())
      expect(secondResult).not.toBe(firstResult)
    })
  })
})
