import { expect } from 'chai';
import moxios from 'moxios';
const { StatusCodes } = require('http-status-codes');
const ItemController =  require('../../../controller/ItemController').ItemController;
const axiosInstance =  require('../../../controller/ItemController').axiosInstance;

describe('Add Item Controller Unit Tests', () => {
  beforeEach(async () => {
    moxios.install(axiosInstance);
  });

  it('Should add an item with comment successfully', async () => {
    // Arrange
    const expectedItem = {
      name: "Cheese",
      comment: "Exquisite blue cheese",
      listId: 1
    }

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: expectedItem,
      });
    });
    // Act
    const actualResponse = await ItemController.createItem(
      expectedItem.name,expectedItem.comment,expectedItem.listId);

    const body = actualResponse.data;
    // Assert
    expect(actualResponse.status).to.equal(StatusCodes.CREATED);
    expect(body).to.be.an('object');
    expect(body).to.have.property('name');
    expect(body).to.have.property('comment');
    expect(body).to.have.property('listId');
    expect(body.name).to.equal(expectedItem.name);
    expect(body.comment).to.equal(expectedItem.comment);
    expect(body.listId).to.equal(1);
  })

  it('Should add an item without comment successfully', async () => {
    // Arrange
    const expectedItem = {
      name: "Cheese",
      comment: "",
      listId: 1
    }

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: expectedItem,
      });
    });
    // Act
    const actualResponse = await ItemController.createItem(
      expectedItem.name,expectedItem.comment,expectedItem.listId);

    const body = actualResponse.data;
    // Assert
    expect(actualResponse.status).to.equal(StatusCodes.CREATED);
    expect(body).to.be.an('object');
    expect(body).to.have.property('name');
    expect(body).to.have.property('comment');
    expect(body).to.have.property('listId');
    expect(body.name).to.equal(expectedItem.name);
    expect(body.comment).to.equal(expectedItem.comment);
    expect(body.listId).to.equal(1);
  })

  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });
})
