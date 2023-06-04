const provider = require('../../config/init-pact')
const ShoppingListController = require('../../../../controller/ShoppingListController')
const { expect } = require('chai')

// eslint-disable-next-line no-undef
describe('Items List Service - Update list', () => {
  // eslint-disable-next-line no-undef
  describe('When a request to update a list is made', () => {
    // eslint-disable-next-line no-undef
    before(async () => {
      await provider.setup()
      await provider.addInteraction({
        uponReceiving: 'a request to update a list',
        state: 'has list to update',
        withRequest: {
          method: 'PUT',
          path: '/api/v1/itemsList/1',
          body: {
            name: 'Shopping List 1'
          }
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
      const response = await ShoppingListController.updateItemsList(1, 'Shopping List 1')

      // Verifying status within response
      expect(response.status).to.be.eql(204)

      await provider.verify()
    })
  })
})
