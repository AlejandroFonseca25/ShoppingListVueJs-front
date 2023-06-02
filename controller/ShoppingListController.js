import {AXIOS} from "../src/components/http-common";

export const ShoppingListController = {
  createItemsList(nameParam){
    return AXIOS.post('/itemsList', {
      name: nameParam
    })
  }
}
