const {expect} = require('chai');
const moxios = require('moxios');
const ShoppingListController = require('../../controller/ShoppingListController').ShoppingListController
const axiosInstance = require('../../controller/ShoppingListController').axiosInstance



describe('Shopping list controller unit tests', () => {

  beforeEach(async () => {
    moxios.install(axiosInstance);
  });

  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });

  it('Test creation of a shopping list', async () => {
    const shoppingListToCreate = "Shopping list 1";
    const expectedResponse = {id: 1};

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: expectedResponse
      });
    });

    const actualResponse = await ShoppingListController.createItemsList(shoppingListToCreate);
    expect(actualResponse.status).to.be.eql(201);
    expect(actualResponse.data).to.be.eql(expectedResponse);
  })

  it('Test getting shopping lists', async () => {
    const expectedResponse = [
      {
        "id": 1,
        "name": "Shopping list 1"
      },
      {
        "id": 2,
        "name": "Shopping list 2"
      },
      {
        "id": 3,
        "name": "Shopping list 3"
      }
    ]

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse
      });
    });

    const actualResponse = await ShoppingListController.getItemsLists();
    expect(actualResponse.status).to.be.eql(200);
    expect(actualResponse.data.length).to.be.eql(expectedResponse.length);
    expect(actualResponse.data[0]).to.be.eql(expectedResponse[0]);
    expect(actualResponse.data[1]).to.be.eql(expectedResponse[1]);
    expect(actualResponse.data[2]).to.be.eql(expectedResponse[2]);
  })

  it('Test deleting shopping list', async () => {
    const expectedResponse = null

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 204,
        response: expectedResponse
      });
    });

    const actualResponse = await ShoppingListController.deleteItemsListById(1);
    expect(actualResponse.status).to.be.eql(204);
    expect(actualResponse.data).to.be.null;
  })

  it('Test getting a shopping list by id', async () => {
    const expectedResponse = {
      "id": 1,
      "name": "Shopping list 1",
      "items": []
    }

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse
      });
    });

    const actualResponse = await ShoppingListController.getItemsListById(1);
    expect(actualResponse.status).to.be.eql(200);
    expect(actualResponse.data).to.be.eql(expectedResponse);
  })

  it('Test updating shopping list', async () => {
    const shoppingList1NewName = "Shopping list 1 new name";
    const expectedResponse = null

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 204,
        response: expectedResponse
      });
    });

    const actualResponse = await ShoppingListController.updateItemsList(1, shoppingList1NewName);
    expect(actualResponse.status).to.be.eql(204);
    expect(actualResponse.data).to.be.null;
  })
})
