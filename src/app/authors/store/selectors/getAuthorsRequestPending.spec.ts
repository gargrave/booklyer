import { AppState } from 'store/reducers'

import { getAuthorsRequestPending } from './getAuthorsRequestPending'

describe('getAuthorsRequestPending', () => {
  describe('Basic Usage', () => {
    it('returns the correct loading state when true', () => {
      const state = { authors: { requestPending: true } }
      const loading = getAuthorsRequestPending(state as AppState)
      expect(loading).toBe(true)
    })

    it('returns the correct loading state when false', () => {
      const state = { authors: { requestPending: false } }
      const loading = getAuthorsRequestPending(state as AppState)
      expect(loading).toBe(false)
    })
  })
})
