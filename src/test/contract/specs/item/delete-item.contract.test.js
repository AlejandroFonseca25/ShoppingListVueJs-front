const { Matchers } = require('@pact-foundation/pact')
const { expect } = require('chai')
const provider = require('../../config/init-pact')
const ItemController = require('../../../../controller/ItemController')

// eslint-disable-next-line no-undef
describe('Item Service - Delete Item', () => {
  // eslint-disable-next-line no-undef
  describe('When a successful request to delete an item is made', () => {
    // eslint-disable-next-line no-undef
    before(async () => {
      await provider.setup()
      await provider.addInteraction({
        uponReceiving: 'a request to delete an item',
        state: 'has items to delete',
        withRequest: {
          method: 'DELETE',
          path: '/api/v1/item/1'
        },
        willRespondWith: {
          status: 204
        }
      })
    })

    // eslint-disable-next-line no-undef
    after(() => provider.finalize())

    // eslint-disable-next-line no-undef
    it('should return the correct data', async () => {
      const itemId = 1

      const response = await ItemController.deleteItem(itemId);

      // Verifying response is not undefined
      // eslint-disable-next-line no-unused-expressions
      expect(response).to.not.be.undefined

      // Verifying status property within response
      expect(response).to.have.property('status')

      // Verifying response status is equal to expected status
      expect(response.status).to.be.eql(204)

      await provider.verify()
    })
  })
})
