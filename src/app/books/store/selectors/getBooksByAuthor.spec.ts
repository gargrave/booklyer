import { produce } from 'immer'

import {
  fullAuthorsState,
  fullBooksState,
  fullState,
} from 'packages/mocks/src/redux'
import { getBooksByAuthor } from './getBooksByAuthor'
import { BookPropertyNames } from '../../books.types'

const state = fullState as any
const firstAuthor = Object.values(fullAuthorsState.data)[0]
const authorId = firstAuthor.id

const getChangedState = () => {
  return produce(state, draft => {
    draft.books.data = { ...fullBooksState.data }
  }) as any
}

describe('getBooksByAuthor', () => {
  describe('Basic Usage', () => {
    it('returns the fully-populated data from the store', () => {
      const records = getBooksByAuthor(state as any, authorId)
      const expectedLength = Object.values(fullBooksState.data).filter(
        book => book.authorId === authorId,
      ).length

      expect(records.length).toBe(expectedLength)
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
      const firstResult = getBooksByAuthor(state, authorId)
      const secondResult = getBooksByAuthor(state, authorId)
      expect(secondResult).toBe(firstResult)
    })

    it('returns a new object if something pertinent is changed', () => {
      const firstResult = getBooksByAuthor(state, authorId)
      const secondResult = getBooksByAuthor(getChangedState(), authorId)
      expect(secondResult).not.toBe(firstResult)
    })
  })
})
