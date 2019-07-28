import { AppState } from 'store/reducers'

import { getBooksRequestPending } from './getBooksRequestPending'

describe('getBooksRequestPending', () => {
  describe('Basic Usage', () => {
    it('returns the correct loading state when true', () => {
      const state = { books: { requestPending: true } }
      const loading = getBooksRequestPending(state as AppState)
      expect(loading).toBe(true)
    })

    it('returns the correct loading state when false', () => {
      const state = { books: { requestPending: false } }
      const loading = getBooksRequestPending(state as AppState)
      expect(loading).toBe(false)
    })
  })
})
