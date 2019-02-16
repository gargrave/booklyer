import { clamp } from './mathHelpers'

describe('clamp', () => {
  describe('"val" is between "min" and "max"', () => {
    it('returns "val"', () => {
      expect(clamp(5, 1, 10)).toBe(5)
    })
  })

  describe('"val" is too high', () => {
    it('returns the max value', () => {
      expect(clamp(10, 1, 5)).toBe(5)
    })
  })

  describe('"val" is too low', () => {
    it('returns the max value', () => {
      expect(clamp(-1, 1, 5)).toBe(1)
    })
  })
})
