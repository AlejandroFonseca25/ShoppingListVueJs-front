const provider = require('../../config/init-pact')
const { Matchers } = require('@pact-foundation/pact')
const ItemController = require('../../../../controller/ItemController').ItemController
const { expect } = require('chai')

// eslint-disable-next-line no-undef
describe('Item service - Update item', () => {
  // eslint-disable-next-line no-undef
  describe('When a request to update a item is made', () => {
    // eslint-disable-next-line no-undef
    before(async () => {
      await provider.setup()
      await provider.addInteraction({
        uponReceiving: 'a request to update a item',
        state: 'has item to update',
        withRequest: {
          method: 'PUT',
          path: '/api/v1/item/1',
          body: {
            name: 'Orange 2kg',
            comment: Matchers.like('For juice'),
            listId: Matchers.like(1),
          }
        },
        willRespondWith: {
          status: 200
        }
      })
    })

    // eslint-disable-next-line no-undef
    after(() => provider.finalize())

    // eslint-disable-next-line no-undef
    it('should return the correct data', async () => {
      const response = await ItemController.editItem(1,'Orange 2kg','For juice',1)

      // Verifying status within response
      expect(response.status).to.be.eql(200)

      await provider.verify()
    })
  })
})
