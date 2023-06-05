import {ShoppingList} from "../page/index";
import {ShoppingListList} from "../page/index";
import {SimpleShoppingList} from "../page/index";

let shoppingListList: ShoppingListList;
const endpoint = "http://localhost:8091";


describe("Verifying the deletion of a shopping list", () => {
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

  it("should delete a list successfully on the homepage", () => {
    let initialNumberOfShoppingList: any;
    shoppingListList.getNumberOfShoppingLists().then((length) => {
      initialNumberOfShoppingList = length;
      let shoppingListCreated: any;
      shoppingListList.getLastShoppingList().then((lastShoppingList) => {
        shoppingListList.deleteLastShoppingList();
        cy.wait(2000);
        let finalNumberOfShoppingList: any;
        shoppingListList.getNumberOfShoppingLists().then((finalLength) => {
          finalNumberOfShoppingList = finalLength;
          assert.equal(initialNumberOfShoppingList - 1, finalNumberOfShoppingList, "The shopping list that was recent added was not deleted")
        });
      });
    });
  });

  it("should not delete a list on the homepage when the user press the cancel button", () => {
    let initialNumberOfShoppingList: any;
    shoppingListList.getNumberOfShoppingLists().then((length) => {
      initialNumberOfShoppingList = length;
      let shoppingListCreated: any;
      shoppingListList.getLastShoppingList().then((lastShoppingList) => {
        // @ts-ignore
        shoppingListList.getLastShoppingList().then((lastList: JQuery<HTMLElement>) => {
          cy.wrap(lastList).find(shoppingListList.getDeleteShoppingListButton()).click();
          cy.wait(2000);
          cy.get(shoppingListList.getCancelButtonInTheDeletionAlert()).click();
          let finalNumberOfShoppingList: any;
          shoppingListList.getNumberOfShoppingLists().then((finalLength) => {
            finalNumberOfShoppingList = finalLength;
            assert.equal(initialNumberOfShoppingList, finalNumberOfShoppingList, "The shopping list that was recent added was deleted")
          });
        })
      });
    });
    shoppingListList.deleteLastShoppingList();
    cy.wait(2000);
  })

  it("should delete a list when the user enters the shopping list page", () => {
    let shoppingList = new ShoppingList();
    let initialNumberOfShoppingList: any;
    shoppingListList.getNumberOfShoppingLists().then((length) => {
      initialNumberOfShoppingList = length;
      let shoppingListCreated: any;
      shoppingListList.getLastShoppingList().then((lastShoppingList) => {
        shoppingListCreated = lastShoppingList;
        cy.wrap(shoppingListCreated).find(shoppingListList.getGoToShoppingListButton())
          .click();
        shoppingList.deleteShoppingList();
        cy.get(shoppingList.getDeleteButtonInTheDeletionAlert()).click();
        cy.wait(2000);
        let finalNumberOfShoppingList: any;
        shoppingListList.getNumberOfShoppingLists().then((finalLength) => {
          finalNumberOfShoppingList = finalLength;
          assert.equal(initialNumberOfShoppingList - 1, finalNumberOfShoppingList, "The shopping list that was recent added was not deleted")
        });
      });
    });
  })
});
