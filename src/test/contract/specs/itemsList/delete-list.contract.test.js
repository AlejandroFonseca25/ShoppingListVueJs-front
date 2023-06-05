const provider = require('../../config/init-pact')
const ShoppingListController = require('../../../../controller/ShoppingListController').ShoppingListController
const { expect } = require('chai')

// eslint-disable-next-line no-undef
describe('Items List Service - Delete list', () => {
  // eslint-disable-next-line no-undef
  describe('When a request to delete a list is made', () => {
    // eslint-disable-next-line no-undef
    before(async () => {
      await provider.setup()
      await provider.addInteraction({
        uponReceiving: 'a request to delete a list',
        state: 'has list to delete',
        withRequest: {
          method: 'DELETE',
          path: '/api/v1/itemsList/1'
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
      const response = await ShoppingListController.deleteItemsListById(1)

      // Verifying status within response
      expect(response.status).to.be.eql(204)

      await provider.verify()
    })
  })
})
