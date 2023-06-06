const provider = require('../../config/init-pact')
const { Matchers } = require('@pact-foundation/pact')
const ItemController = require('../../../../controller/ItemController').ItemController
const { expect } = require('chai')

// eslint-disable-next-line no-undef
describe('Item service - Get item', () => {
    // eslint-disable-next-line no-undef
    describe('When a request to get a item is made', () => {
      // eslint-disable-next-line no-undef
      before(async () => {
        await provider.setup()
        await provider.addInteraction({
          uponReceiving: 'a request to get a item',
          state: 'has item to get',
          withRequest: {
            method: 'GET',
            path: '/api/v1/item/1'
          },
          willRespondWith: {
            status: 200,
            body: Matchers.somethingLike({
              // eslint-disable-next-line no-undef
                id: Matchers.like(1),
                name: Matchers.like('Orange 2k'),
                comment: Matchers.like('For juice'),
                bought: Matchers.like(true),
                listId: Matchers.like(1)
            })
          }
        })
      })

      // eslint-disable-next-line no-undef
      after(() => provider.finalize())

      // eslint-disable-next-line no-undef
      it('should return the correct data', async () => {
        const item = {
          // eslint-disable-next-line no-undef
          id: 1,
          name: 'Orange 2k',
          comment: 'For juice',
          bought: true,
          listId: 1
        }

        const response = await ItemController.getItemById(item.id)
        const responseBody = response.data

        // Verifying response is not undefined
        // eslint-disable-next-line no-unused-expressions
        expect(responseBody).to.not.be.undefined

        // Verifying data properties within response
        expect(responseBody).to.have.property('id')
        expect(responseBody).to.have.property('name')
        expect(responseBody).to.have.property('comment')
        expect(responseBody).to.have.property('bought')
        expect(responseBody).to.have.property('listId')
        // Verifying response data is equal to expected data
        expect(responseBody).to.be.eql(item)

        await provider.verify()
      })
    })
  })
