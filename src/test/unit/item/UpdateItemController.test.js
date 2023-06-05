const {expect} = require('chai');
const moxios = require('moxios');
const { StatusCodes } = require('http-status-codes');
const ItemController =  require('../../../controller/ItemController').ItemController;
const axiosInstance =  require('../../../controller/ItemController').axiosInstance;

describe('Update Item Controller Unit Tests', () => {
  beforeEach(async () => {
    moxios.install(axiosInstance);
  });

  it('Should update an item successfully', async () => {
    // Arrange
    const expectedItem = {
      name: "Cheese",
      comment: "Exquisite blue cheese",
      listId: 56756,
      bought: false,
    }

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedItem,
      });
    });
    // Act
    const actualResponse = await ItemController.editItem(1);

    // Assert
    expect(actualResponse.status).to.equal(StatusCodes.OK);
  })
})
