import { Address } from './'

describe('Address', () => {
  describe('constructor', () => {
    it('should set active to true if not assigned', () => {
      const testAddress = new Address({})
      expect(testAddress.active).toEqual(true)
    })
    it('should set active to false if assigned false', () => {
      const testAddress = new Address({ active: false })
      expect(testAddress.active).toEqual(false)
    })
  })
})
