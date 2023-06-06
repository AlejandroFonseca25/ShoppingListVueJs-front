import {ShoppingListList, SimpleShoppingListAdd} from "../page/index";
import {SimpleShoppingListEdit} from "../page/index";
import {ShoppingList} from "../page/index";

let shoppingListList: ShoppingListList;
const endpoint = "https://polite-bush-05fb25610.3.azurestaticapps.net";

describe("Verifying the edition of a shopping list", () => {

  let shoppingListName = "Shopping list test"
  let simpleShoppingList: SimpleShoppingListEdit;

  beforeEach(() => {
    cy.visit(endpoint);
    shoppingListList = new ShoppingListList();
    cy.wait(2000);
    simpleShoppingList = new SimpleShoppingListEdit();
    shoppingListList.addShoppingList(shoppingListName);
  });

  afterEach(() => {
    shoppingListList.deleteLastShoppingList();
    cy.wait(2000);
  });

  it('should edit a list successfully on the homepage', () => {
    let shoppingListCreated: any;
    shoppingListList.getLastShoppingList().then((lastShoppingList) => {
      shoppingListCreated = lastShoppingList;
      cy.wrap(shoppingListCreated).find(shoppingListList.getGoToShoppingListButton())
        .should("contain.text", shoppingListName);
      cy.wrap(shoppingListCreated).find(shoppingListList.getDeleteShoppingListButton());
      cy.wrap(shoppingListCreated).find(shoppingListList.getEditShoppingListButton());
      cy.wrap(shoppingListCreated).find(shoppingListList.getEditShoppingListButton()).click();
      cy.get(simpleShoppingList.getTitleInEditShoppingList()).should("contain.text", "Edit "+shoppingListName);
      let shoppingListNameEdited = shoppingListName + " edited";
      simpleShoppingList.editShoppingList(shoppingListNameEdited);
      cy.get(simpleShoppingList.getTitleInEditShoppingList()).should("contain.text", "Edit "+shoppingListNameEdited);
      cy.get(simpleShoppingList.getUpdateShoppingListButton()).click();
      shoppingListList.getLastShoppingList().then((lastShoppingListAfterEditing) => {
        cy.wrap(lastShoppingListAfterEditing).find(shoppingListList.getGoToShoppingListButton())
          .should("contain.text", shoppingListNameEdited);
        cy.wrap(lastShoppingListAfterEditing).find(shoppingListList.getDeleteShoppingListButton());
        cy.wrap(lastShoppingListAfterEditing).find(shoppingListList.getEditShoppingListButton());
      });
    });
  });

  it('should successfully edit a list when the user enters the shopping list page', () => {
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
      cy.wait(2000)
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
  });
});
