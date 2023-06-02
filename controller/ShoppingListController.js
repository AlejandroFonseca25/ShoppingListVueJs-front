import {AXIOS} from "../src/components/http-common";

export const ShoppingListController = {
  createItemsList(nameParam){
    return AXIOS.post('/itemsList', {
      name: nameParam
    })
  },
  getItemsLists(){
    return AXIOS.get('/')
  },
  deleteItemsListById(id){
    return AXIOS.delete('/itemsList/' + id)
  },
  getItemsListById(listId){
    return AXIOS.get('/itemsList/' + listId)
  },
  updateItemsList(listId, listName){
    return AXIOS.put('/itemsList/' + listId, {
      name: listName
    })
  },
}
