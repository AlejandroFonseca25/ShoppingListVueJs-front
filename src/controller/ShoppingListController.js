const axios = require('axios')

const axiosInstance = axios.create({baseURL: 'http://localhost:8090/api/v1'})

const ShoppingListController = {
  createItemsList (nameParam) {
    return axiosInstance.post('/itemsList', {
      name: nameParam
    })
  },
  getItemsLists () {
    return axiosInstance.get('/')
  },
  deleteItemsListById (listId) {
    return axiosInstance.delete('/itemsList/' + listId)
  },
  getItemsListById (listId) {
    return axiosInstance.get('/itemsList/' + listId)
  },
  updateItemsList (listId, listName) {
    return axiosInstance.put('/itemsList/' + listId, {
      name: listName
    })
  }
}

module.exports = {ShoppingListController, axiosInstance}
