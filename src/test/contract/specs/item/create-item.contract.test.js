const { Matchers } = require('@pact-foundation/pact')
const { expect } = require('chai')
const provider = require('../../config/init-pact')
const ItemController = require('../../../../controller/ItemController')

// eslint-disable-next-line no-undef
describe('Item Service - Add Item', () => {
  // eslint-disable-next-line no-undef
  describe('When a successful request to add an item is made', () => {
    // eslint-disable-next-line no-undef
    before(async () => {
      await provider.setup()
      await provider.addInteraction({
        uponReceiving: 'a request to add an item',
        state: 'there are no items',
        withRequest: {
          method: 'POST',
          path: '/api/v1/item',
          body: Matchers.somethingLike({
            name: Matchers.like('Cheese'),
            comment: Matchers.like('Fresh parmesan cheese'),
            listId: Matchers.somethingLike(1)
          })
        },
        willRespondWith: {
          status: 201,
          body: Matchers.somethingLike({
            id: Matchers.like(45326),
            listId: Matchers.like(1)
          })
        }
      })
    })

    // eslint-disable-next-line no-undef
    after(() => provider.finalize())

    // eslint-disable-next-line no-undef
    it('should return the correct data', async () => {
      const itemName = 'Cheese'
      const itemComment = 'Fresh parmesan cheese'
      const itemListId = 1

      const response = await ItemController.createItem(itemName, itemComment, itemListId);
      const responseBody = response.data

      // Verifying response is not undefined
      // eslint-disable-next-line no-unused-expressions
      expect(responseBody).to.not.be.undefined

      // Verifying data properties within response
      expect(responseBody).to.have.property('id')
      expect(responseBody).to.have.property('listId')

      // Verifying response data is equal to expected data
      expect(responseBody.id).to.be.eql(45326)
      expect(responseBody.listId).to.be.eql(1)

      await provider.verify()
    })
  })
})
