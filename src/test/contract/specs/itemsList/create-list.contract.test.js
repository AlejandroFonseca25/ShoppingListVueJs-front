const { Matchers } = require('@pact-foundation/pact')
const { expect } = require('chai')
const provider = require('../../config/init-pact')
const ShoppingListController = require('../../../../controller/ShoppingListController').ShoppingListController

// eslint-disable-next-line no-undef
describe('Items List Service - Add list', () => {
  // eslint-disable-next-line no-undef
  describe('When a successful request to add a list is made', () => {
    // eslint-disable-next-line no-undef
    before(async () => {
      await provider.setup()
      await provider.addInteraction({
        uponReceiving: 'a request to add a list',
        state: 'there are no lists',
        withRequest: {
          method: 'POST',
          path: '/api/v1/itemsList',
          body: Matchers.somethingLike({
            name: Matchers.like('Shopping list')
          })
        },
        willRespondWith: {
          status: 201,
          body: Matchers.somethingLike({
            id: Matchers.somethingLike(45326)
          })
        }
      })
    })

    // eslint-disable-next-line no-undef
    after(() => provider.finalize())

    // eslint-disable-next-line no-undef
    it('should return the correct data', async () => {
      const shoppingListName = 'Shopping list'

      const response = await ShoppingListController.createItemsList(shoppingListName)
      const responseBody = response.data

      // Verifying response is not undefined
      // eslint-disable-next-line no-unused-expressions
      expect(responseBody).to.not.be.undefined

      // Verifying data properties within response
      expect(responseBody).to.have.property('id')

      // Verifying response data is equal to expected data
      expect(responseBody.id).to.be.a('number');

      await provider.verify()
    })
  })
})
