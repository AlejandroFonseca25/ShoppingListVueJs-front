import { expect } from 'chai';
import moxios from 'moxios';
import { ShoppingListController, axiosInstance } from '../../controllers/ShoppingListController.js';

describe('Shopping list controller unit tests', () => {

  beforeEach(async () => {
    moxios.install(axiosInstance);
  });

  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });

  it('Test Register Animal', async () => {
    const shoppingListToCreate = {
      name: "Shopping list 1"
    }

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: 1,
      });
    });

    // Act

    // Assert
  })
})
