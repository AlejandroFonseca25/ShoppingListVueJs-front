import {ShoppingListList} from "../page/index";
import {ShoppingList} from "../page/index";
import {ItemDetails} from "../page/index";

let shoppingListList: ShoppingListList;
let shoppingList = new ShoppingList();
let itemDetails = new ItemDetails();
const endpoint = "https://polite-bush-05fb25610.3.azurestaticapps.net";
let shoppingListName = "Shopping list test"
let itemName = "Orange"
let itemComment = "For juice"

describe("Verifying the get of a item", () => {

    beforeEach(() => {
      cy.visit(endpoint);
      shoppingListList = new ShoppingListList();
      shoppingList = new ShoppingList();
      shoppingListList.addShoppingList(shoppingListName)
      shoppingListList.addItem(itemName,itemComment)
      cy.wait(2000);
    });

    it('should get an item information with name, comement and badge successfully', () => {
        let itemCreated: any;
        shoppingList.getLastListGroupItem().then((lastitem) => {
            itemCreated = lastitem; 

            shoppingList.clickItemNameInLastItem();
            
            itemDetails.getItemNameFromItemPage().then((name) => {
                expect(name).to.equal(itemName);

                itemDetails.getItemCommentFromItemPage().then((comment) => {
                    expect(comment).to.equal(itemComment);

                    itemDetails.getItemBadgeFromItemPage().then((badge) => {
                        expect("No").to.equal(badge);
                        itemDetails.goBack()
                    });
                });
            });           
        });       
      });

      afterEach(() => {
        shoppingList.goToHome();
        shoppingListList.deleteLastShoppingList();
      });
  
  
  });