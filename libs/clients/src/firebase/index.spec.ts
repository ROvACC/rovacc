import { getDatabaseClient } from './'
import { vi, beforeEach, describe, expect, it } from 'vitest'

describe('clients', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  describe('getDatabaseClient', () => {
    it('should throw if no databaseConnection', () => {
      expect(() => getDatabaseClient()).toThrow()
    })
    it('should write more tests', () => {
      expect(true).toBe(true)
    })
  })
})
