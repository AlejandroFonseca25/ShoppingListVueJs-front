import {ShoppingListList} from "../page/index";
import {SimpleShoppingList} from "../page/index";
import {ShoppingList} from "../page/index";

let shoppingListList: ShoppingListList;
const endpoint = "http://localhost:8091";

describe("Verifying the edition of a shopping list", () => {

  let shoppingListName = "Shopping list test"
  let simpleShoppingList: SimpleShoppingList;

  beforeEach(() => {
    cy.visit(endpoint);
    shoppingListList = new ShoppingListList();
    cy.wait(2000);
    simpleShoppingList = new SimpleShoppingList();
    shoppingListList.addShoppingList(shoppingListName);
    cy.wait(2000);
  });

  afterEach(() => {
    shoppingListList.deleteLastShoppingList();
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
});
