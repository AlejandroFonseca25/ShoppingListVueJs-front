import {ShoppingListList, ShoppingList,
  ItemDetails, SimpleItemEdit, SimpleItemAdd, SimpleShoppingListAdd} from "../page/index";


let shoppingListList: ShoppingListList;
const endpoint = "http://localhost:8091/#/";

describe("Verifying the edition of a shopping list item", () => {

  let shoppingListName = "Shopping list test"
  let itemName = "Cheese"
  let itemComment = "Epic mozzarella cheese"
  let shoppingList: ShoppingList;
  let simpleItemEdit: SimpleItemEdit;

  beforeEach(() => {
    cy.visit(endpoint);
    cy.wait(2000);
    shoppingListList = new ShoppingListList();
    shoppingList = new ShoppingList();
    simpleItemEdit = new SimpleItemEdit();
    shoppingListList.addShoppingList(shoppingListName);
    shoppingListList.addItem(itemName, itemComment);
    shoppingList.goToHome();
  });

  afterEach(() => {
    shoppingList.goToHome();
    shoppingListList.deleteLastShoppingList();
  });

  it('should edit an item name and comment successfully', () => {
    let shoppingListCreated: any;
    shoppingListList.getLastShoppingList().then((lastShoppingList) => {
      shoppingListCreated = lastShoppingList;
      cy.wrap(shoppingListCreated).find(shoppingListList.getGoToShoppingListButton())
        .click();
      cy.wait(2000);
      shoppingList.editItem();
      cy.wait(2000);
      simpleItemEdit.updateItem("Bubblegum","Chewy blueberry bubblegum");
      shoppingList.getItemName().should("have.text","Bubblegum");
      shoppingList.getItemComment().should("have.text","Chewy blueberry bubblegum");
      cy.wait(2000);
    });
  });

  /*it('should edit an item name and remove the comment successfully', () => {
    let shoppingListCreated: any;
    shoppingListList.getLastShoppingList().then((lastShoppingList) => {
      shoppingListCreated = lastShoppingList;
      cy.wrap(shoppingListCreated).find(shoppingListList.getGoToShoppingListButton())
        .click();
      cy.wait(2000);
      shoppingList.editItem();
      cy.wait(2000);
      simpleItemEdit.updateItem("Pinneaple","");
      shoppingList.getItemName().should("have.text","Bubblegum");
      shoppingList.getItemRow().should("")
      cy.wait(2000);
    });
  });*/

  /*it('should successfully edit a list when the user enters the shopping list page', () => {
    let shoppingList = new ShoppingList();
    let shoppingListCreated: any;
    shoppingListList.getLastShoppingList().then((lastShoppingList) => {
      shoppingListCreated = lastShoppingList;
      cy.wrap(shoppingListCreated).find(shoppingListList.getGoToShoppingListButton())
        .click();
      cy.get(shoppingList.getShoppingListName()).should("contain.text", shoppingListName);
      cy.get(shoppingList.getNumberOfItems()).should("contain.text", 0);
      shoppingList.editShoppingList();
      let shoppingListNameEdited = shoppingListName + " edited";
      simpleShoppingList.editShoppingList(shoppingListNameEdited);
      cy.get(simpleShoppingList.getTitleInEditShoppingList()).should("contain.text", "Edit "+shoppingListNameEdited);
      cy.get(simpleShoppingList.getUpdateShoppingListButton()).click();
      shoppingListList.getLastShoppingList().then((lastShoppingListAfterEditing) => {
        cy.wrap(lastShoppingListAfterEditing).find(shoppingListList.getGoToShoppingListButton())
          .should("contain.text", shoppingListNameEdited);
        cy.wrap(lastShoppingListAfterEditing).find(shoppingListList.getDeleteShoppingListButton());
        cy.wrap(lastShoppingListAfterEditing).find(shoppingListList.getEditShoppingListButton());
        cy.wrap(lastShoppingListAfterEditing).find(shoppingListList.getGoToShoppingListButton())
          .click();
        cy.get(shoppingList.getShoppingListName()).should("contain.text", shoppingListNameEdited);
        cy.get(shoppingList.getNumberOfItems()).should("contain.text", 0);
        shoppingList.goToHome();
      });
    });
  });

  it('should show an error message when the text field is empty', () => {
    let errorMessage = "must not be blank";
    // let errorMessage = "no puede estar vacío";
    let shoppingListCreated: any;
    shoppingListList.getLastShoppingList().then((lastShoppingList) => {
      shoppingListCreated = lastShoppingList;
      cy.wrap(shoppingListCreated).find(shoppingListList.getGoToShoppingListButton())
        .should("contain.text", shoppingListName);
      cy.wait(2000)
      cy.wrap(shoppingListCreated).find(shoppingListList.getEditShoppingListButton())
        .click();
      cy.get(simpleShoppingList.getShoppingListNameInput()).clear()
      cy.wait(2000)
      cy.get(simpleShoppingList.getUpdateShoppingListButton()).click()
      cy.get(simpleShoppingList.getErrorMessage()).should("contain.text", errorMessage);
      simpleShoppingList.goToHome();
      shoppingListList.getLastShoppingList().then((lastShoppingListAfter) => {
        cy.wrap(lastShoppingListAfter).find(shoppingListList.getGoToShoppingListButton())
          .should("contain.text", shoppingListName);
      });
    });
  });*/
});
