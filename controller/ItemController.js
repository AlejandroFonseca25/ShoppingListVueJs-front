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
  }
}
