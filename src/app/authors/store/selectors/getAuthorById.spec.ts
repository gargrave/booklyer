import { produce } from 'immer'

import { fullAuthorsState, fullState } from 'packages/mocks/src/redux'
import { getAuthorById } from './getAuthorById'
import { AuthorPropertyNames } from '../../authors.types'

const state = fullState as any
const firstAuthor = Object.values(fullAuthorsState.data)[0]

const getChangedState = () => {
  return produce(state, draft => {
    draft.authors.data = { ...fullAuthorsState.data }
  }) as any
}

describe('getAuthorById', () => {
  describe('Basic Usage', () => {
    it('returns the correct record corresponding to the provided ID', () => {
      const result = getAuthorById(state, firstAuthor.id)

      expect(result).toBeDefined()
      // yes, we know this is defined at this point; this check is just to make TS happy
      if (result) {
        expect(result.id).toBeDefined()
        // ensure all expected attributes are there
        AuthorPropertyNames.forEach(attr => {
          expect(result[attr]).toBeDefined()
        })
      }
    })

    it('returns undefined if the provided ID does not exist', () => {
      const result = getAuthorById(state, 'invalid-id')
      expect(result).toBeUndefined()
    })
  })

  describe('Memoization', () => {
    it('returns the memoized object reference if nothing pertinent is changed', () => {
      const firstResult = getAuthorById(state, firstAuthor.id)
      const secondResult = getAuthorById(state, firstAuthor.id)
      expect(secondResult).toBe(firstResult)
    })

    it('returns a new object if something pertinent is changed', () => {
      const firstResult = getAuthorById(state, firstAuthor.id)
      const secondResult = getAuthorById(getChangedState(), firstAuthor.id)
      expect(secondResult).not.toBe(firstResult)
    })
  })
})
