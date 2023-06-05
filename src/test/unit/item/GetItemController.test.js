import { expect } from 'chai';
import moxios from 'moxios';
const { StatusCodes } = require('http-status-codes');
const ItemController =  require('../../../controller/ItemController').ItemController;
const axiosInstance =  require('../../../controller/ItemController').axiosInstance;

describe('Get Item Controller Unit Tests', () => {
  beforeEach(async () => {
    moxios.install(axiosInstance);
  });

  it('Should get an item successfully', async () => {
    // Arrange
    const expectedItem = {
      name: "Cheese",
      comment: "Exquisite blue cheese",
      id: 45326,
      listId: 56756,
      bought: false,
    }

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response:expectedItem
      });
    });
    // Act
    const actualResponse = await ItemController.deleteItem(1);

    const body = actualResponse.data;
    // Assert
    expect(actualResponse.status).to.equal(StatusCodes.OK);
    expect(body).to.be.an('object');
    expect(body).to.have.property('id');
    expect(body).to.have.property('name');
    expect(body).to.have.property('comment');
    expect(body).to.have.property('listId');
    expect(body).to.have.property('bought');
    expect(body.id).to.equal(expectedItem.id);
    expect(body.name).to.equal(expectedItem.name);
    expect(body.comment).to.equal(expectedItem.comment);
    expect(body.listId).to.equal(expectedItem.listId);
    expect(body.bought).to.equal(expectedItem.bought);
  })
})
