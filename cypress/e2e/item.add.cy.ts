import {ShoppingListList} from "../page/index";
import {SimpleShoppingListAdd} from "../page/index";
import {ShoppingList} from "../page/index";
import {SimpleItemAdd} from "../page/index";

let shoppingListList: ShoppingListList;
const endpoint = "http://localhost:8091/#/";
describe("Verifying the creation of a item", () => {

    beforeEach(() => {
      cy.visit(endpoint);
      shoppingListList = new ShoppingListList();
      cy.wait(2000);
    });
  
    it("should create a shopping list successfully", async () => {
        let shoppingListName = "Shopping list test"
        shoppingListList.addShoppingList(shoppingListName);
         
        shoppingListList.deleteLastShoppingList();
            cy.wait(2000);          
    });
  
  });