import { produce } from 'immer'

import { fullAuthorsState, fullState } from 'packages/mocks/src/redux'
import { getAuthors } from './getAuthors'
import { AuthorPropertyNames } from '../../authors.types'

const state = fullState as any

const getChangedState = () => {
  return produce(state, draft => {
    draft.authors.data = { ...fullAuthorsState.data }
  }) as any
}

describe('getAuthors', () => {
  describe('Basic Usage', () => {
    it('returns the fully-populated data from the store', () => {
      const authors = getAuthors(state as any)
      expect(authors.length).toBe(Object.keys(fullAuthorsState.data).length)

      // let's do some assertions on every single author!
      authors.forEach(author => {
        expect(author.id).toBeDefined()
        // ensure all expected attributes are there
        AuthorPropertyNames.forEach(attr => {
          expect(author[attr]).toBeDefined()
        })
      })
    })
  })

  describe('Memoization', () => {
    it('returns the memoized object reference if nothing pertinent is changed', () => {
      const firstResult = getAuthors(state)
      const secondResult = getAuthors(state)
      expect(secondResult).toBe(firstResult)
    })

    it('returns a new object if something pertinent is changed', () => {
      const firstResult = getAuthors(state)
      const secondResult = getAuthors(getChangedState())
      expect(secondResult).not.toBe(firstResult)
    })
  })
})
