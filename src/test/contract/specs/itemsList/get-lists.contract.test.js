const { Matchers } = require('@pact-foundation/pact')
const { expect } = require('chai')
const provider = require('../../config/init-pact')
const ShoppingListController = require('../../../../controller/ShoppingListController')

// eslint-disable-next-line no-undef
describe('Items List Service - Get lists', () => {
  // eslint-disable-next-line no-undef
  describe('When a request to get all lists is made', () => {
    // eslint-disable-next-line no-undef
    before(async () => {
      await provider.setup()
      await provider.addInteraction({
        uponReceiving: 'a request to get all lists',
        state: 'has lists to get',
        withRequest: {
          method: 'GET',
          path: '/api/v1/'
        },
        willRespondWith: {
          status: 200,
          body: Matchers.eachLike({
            id: Matchers.like(45326),
            name: Matchers.like('Shopping list')
          })
        }
      })
    })

    // eslint-disable-next-line no-undef
    after(() => provider.finalize())

    // eslint-disable-next-line no-undef
    it('should return the correct data', async () => {
      const response = await ShoppingListController.getItemsLists()
      const responseBody = response.data

      // Verifying response is an array with one element
      // eslint-disable-next-line no-unused-expressions
      expect(responseBody).to.not.be.undefined
      expect(responseBody).to.be.an('array')
      expect(responseBody).to.have.lengthOf(1)

      // Verifying data within response array
      const list = responseBody[0]
      expect(list.id).to.be.equal(45326)
      expect(list.name).to.be.equal('Shopping list')

      await provider.verify()
    })
  })
})
