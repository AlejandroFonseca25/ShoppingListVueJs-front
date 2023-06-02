import {AXIOS} from "../src/components/http-common";

export const ItemController = {
  createItem(nameParam, commentParam, listIdParam){
    return AXIOS.post('/item', {
      name: nameParam,
      comment: commentParam,
      listId: listIdParam
    })
  },
  getItemById(itemId){
    return AXIOS.get('/item/' + itemId)
  },
  editItem(itemId, itemName, itemComment, itemListId){
    return AXIOS.put('/item/' + itemId, {
      name: itemName,
      comment: itemComment,
      listId: itemListId
    })
  }
}
