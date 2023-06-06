const axios = require('axios')

const axiosInstance = axios.create({baseURL: 'https://shopping-list-back.azurewebsites.net/api/v1'})

const ItemController = {
  createItem (nameParam, commentParam, listIdParam) {
    return axiosInstance.post('/item', {
      name: nameParam,
      comment: commentParam,
      listId: listIdParam
    })
  },
  getItemById (itemId) {
    return axiosInstance.get('/item/' + itemId)
  },
  editItem (itemId, itemName, itemComment, itemListId) {
    return axiosInstance.put('/item/' + itemId, {
      name: itemName,
      comment: itemComment,
      listId: itemListId
    })
  },
  deleteItem (itemId) {
    return axiosInstance.delete('/item/' + itemId)
  },
  buyItem (itemId) {
    return axiosInstance.patch('/item/' + itemId + '/buy')
  }
}

module.exports = {ItemController, axiosInstance}
