const provider = require('../../config/init-pact')
const { Matchers } = require('@pact-foundation/pact')
const ShoppingListController = require('../../../../controller/ShoppingListController')
const { expect } = require('chai')

// eslint-disable-next-line no-undef
describe('Items List Service - Get list', () => {
  // eslint-disable-next-line no-undef
  describe('When a request to get a list is made', () => {
    // eslint-disable-next-line no-undef
    before(async () => {
      await provider.setup()
      await provider.addInteraction({
        uponReceiving: 'a request to get a list',
        state: 'has list to get',
        withRequest: {
          method: 'GET',
          path: '/api/v1/itemsList/1'
        },
        willRespondWith: {
          status: 200,
          body: Matchers.somethingLike({
            // eslint-disable-next-line no-undef
            id: Matchers.like(1),
            name: Matchers.like('Shopping list'),
            items: Matchers.eachLike({
              // eslint-disable-next-line no-undef
              id: Matchers.like(2),
              name: Matchers.like('Orange'),
              comment: Matchers.like('For juice'),
              bought: Matchers.like(true)
            })
          })
        }
      })
    })

    // eslint-disable-next-line no-undef
    after(() => provider.finalize())

    // eslint-disable-next-line no-undef
    it('should return the correct data', async () => {
      const list = {
        // eslint-disable-next-line no-undef
        id: 1,
        name: 'Shopping list',
        items: [
          {
            // eslint-disable-next-line no-undef
            id: 2,
            name: 'Orange',
            comment: 'For juice',
            bought: true
          }
        ]
      }

      const response = await ShoppingListController.getItemsListById(list.id)
      const responseBody = response.data

      // Verifying response is not undefined
      // eslint-disable-next-line no-unused-expressions
      expect(responseBody).to.not.be.undefined

      // Verifying data properties within response
      expect(responseBody).to.have.property('id')
      expect(responseBody).to.have.property('name')
      expect(responseBody).to.have.property('items')
      expect(responseBody.items).to.be.an('array')

      // Verifying response data is equal to expected data
      expect(responseBody).to.be.eql(list)

      await provider.verify()
    })
  })
})
