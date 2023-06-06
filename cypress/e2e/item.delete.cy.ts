import {ItemDetails, ShoppingList, ShoppingListList, SimpleItemEdit} from "../page";

let shoppingListList: ShoppingListList;
const endpoint = "https://polite-bush-05fb25610.3.azurestaticapps.net";

describe("Verifying the deletion of a shopping list item", () => {

  let shoppingListName = "Shopping list test"
  let itemName = "Cheese"
  let itemComment = "Legendary blue cheese"
  let shoppingList: ShoppingList;
  let simpleItemEdit: SimpleItemEdit;
  let itemDetails: ItemDetails;

  beforeEach(() => {
    cy.visit(endpoint);
    cy.wait(2000);
    shoppingListList = new ShoppingListList();
    shoppingList = new ShoppingList();
    simpleItemEdit = new SimpleItemEdit();
    itemDetails = new ItemDetails();
    shoppingListList.addShoppingList(shoppingListName);
    shoppingListList.addItem(itemName, itemComment);
    shoppingList.goToHome();
  });

  afterEach(() => {
    shoppingList.goToHome();
    shoppingListList.deleteLastShoppingList();
  });

  it('should delete an item through the item list', () => {
    let shoppingListCreated: any;
    shoppingListList.getLastShoppingList().then((lastShoppingList) => {
      shoppingListCreated = lastShoppingList;
      cy.wrap(shoppingListCreated).find(shoppingListList.getGoToShoppingListButton())
        .click();
      cy.wait(2000);
      shoppingList.deleteItem();
      cy.wait(2000);
      cy.get(shoppingList.getDeleteButtonInTheDeletionAlert()).click();
      cy.wait(2000);
      cy.get(shoppingList.getNumberOfItems()).should("contain.text",0);
      cy.get('[data-test="item-name"]').should('not.exist');
    });
  });

  it('should delete an item through the item details', () => {
    let shoppingListCreated: any;
    shoppingListList.getLastShoppingList().then((lastShoppingList) => {
      shoppingListCreated = lastShoppingList;
      cy.wrap(shoppingListCreated).find(shoppingListList.getGoToShoppingListButton())
        .click();
      cy.wait(2000);
      shoppingList.getItemName().click();
      cy.wait(2000);
      itemDetails.deleteItem();
      cy.wait(2000);
      cy.get(shoppingList.getDeleteButtonInTheDeletionAlert()).click();
      cy.wait(2000);
      cy.get(shoppingList.getNumberOfItems()).should("contain.text",0);
      cy.get('[data-test="item-name"]').should('not.exist');
    });
  });

  it('should not delete the item when pressing the cancel button', () => {
    let shoppingListCreated: any;
    shoppingListList.getLastShoppingList().then((lastShoppingList) => {
      shoppingListCreated = lastShoppingList;
      cy.wrap(shoppingListCreated).find(shoppingListList.getGoToShoppingListButton())
        .click();
      cy.wait(2000);
      shoppingList.deleteItem();
      cy.wait(2000);
      cy.get(shoppingList.getCancelButtonInTheDeletionAlert()).click();
      cy.wait(2000);
      cy.get(shoppingList.getNumberOfItems()).should("contain.text",1);
      shoppingList.getItemName().should("have.text", "Cheese");
      shoppingList.getItemComment().should("have.text", "Legendary blue cheese");
    });
  });
});
