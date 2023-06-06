import {
  ShoppingListList, ShoppingList,
  ItemDetails, SimpleItemEdit
} from "../page";


let shoppingListList: ShoppingListList;
const endpoint = "https://polite-bush-05fb25610.3.azurestaticapps.net";

describe("Verifying the edition of a shopping list item", () => {

  let shoppingListName = "Shopping list test"
  let itemName = "Cheese"
  let itemComment = "Epic mozzarella cheese"
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

  it('should edit an item name and comment through the item list', () => {
    let shoppingListCreated: any;
    shoppingListList.getLastShoppingList().then((lastShoppingList) => {
      shoppingListCreated = lastShoppingList;
      cy.wrap(shoppingListCreated).find(shoppingListList.getGoToShoppingListButton())
        .click();
      cy.wait(2000);
      shoppingList.editItem();
      cy.wait(2000);
      simpleItemEdit.updateItem("Bubblegum", "Chewy blueberry bubblegum");
      shoppingList.getItemName().should("have.text", "Bubblegum");
      shoppingList.getItemComment().should("have.text", "Chewy blueberry bubblegum");
      cy.wait(2000);
    });
  });

  it('should edit an item name and comment through the item details', () => {
    let shoppingListCreated: any;
    shoppingListList.getLastShoppingList().then((lastShoppingList) => {
      shoppingListCreated = lastShoppingList;
      cy.wrap(shoppingListCreated).find(shoppingListList.getGoToShoppingListButton())
        .click();
      cy.wait(2000);
      shoppingList.getItemName().click();
      cy.wait(2000);
      itemDetails.editItem();
      cy.wait(2000);
      simpleItemEdit.updateItem("Bubblegum", "Chewy blueberry bubblegum");
      shoppingList.getItemName().should("have.text", "Bubblegum");
      shoppingList.getItemComment().should("have.text", "Chewy blueberry bubblegum");
      cy.wait(2000);
    });
  });

  it('should show an error when the name field is empty', () => {
    let shoppingListCreated: any;
    let errorMessage = "must not be blank";
    shoppingListList.getLastShoppingList().then((lastShoppingList) => {
      shoppingListCreated = lastShoppingList;
      cy.wrap(shoppingListCreated).find(shoppingListList.getGoToShoppingListButton())
        .click();
      cy.wait(2000);
      shoppingList.getItemName().click();
      cy.wait(2000);
      itemDetails.editItem();
      cy.wait(2000);
      simpleItemEdit.updateItem("", "Special pepperoni pizza");
      simpleItemEdit.getErrorMessage().should("contain.text", errorMessage);
      cy.wait(2000);
      simpleItemEdit.goBack();
      cy.wait(2000);
    });
  });

  it('should edit an item name and remove the comment', () => {
    let shoppingListCreated: any;
    shoppingListList.getLastShoppingList().then((lastShoppingList) => {
      shoppingListCreated = lastShoppingList;
      cy.wrap(shoppingListCreated).find(shoppingListList.getGoToShoppingListButton())
        .click();
      cy.wait(2000);
      shoppingList.editItem();
      cy.wait(2000);
      simpleItemEdit.updateItem("Pineapple", "");
      shoppingList.getItemName().should("have.text", "Pineapple");
      shoppingList.getItemRow().should("not.have.descendants", "small")
      cy.wait(2000);
    });
  });
});
