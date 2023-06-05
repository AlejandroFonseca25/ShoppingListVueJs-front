const {expect} = require('chai');
const moxios = require('moxios');
const { StatusCodes } = require('http-status-codes');
const ItemController =  require('../../../controller/ItemController').ItemController;
const axiosInstance =  require('../../../controller/ItemController').axiosInstance;

describe('Delete Item Controller Unit Tests', () => {
  beforeEach(async () => {
    moxios.install(axiosInstance);
  });

  it('Should delete an item successfully', async () => {
    // Arrange
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 204,
      });
    });
    // Act
    const actualResponse = await ItemController.deleteItem(1);

    // Assert
    expect(actualResponse.status).to.equal(StatusCodes.NO_CONTENT);
  })
})
