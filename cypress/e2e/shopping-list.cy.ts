import {ShoppingListList} from "../page/index";

let shoppingListList: ShoppingListList;

describe("Verifying the creation of a shopping list", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8091");
    shoppingListList = new ShoppingListList();
    cy.wait(1000);
  });

  it("The page should create a shopping list successfully", async () => {
    // let initialNumberOfShoppingList = await shoppingListList.getNumberOfShoppingLists();
    let initialNumberOfShoppingList: any;
    shoppingListList.getNumberOfShoppingLists().then((length) => {
      initialNumberOfShoppingList = length;
      let shoppingListName = "Shopping list test"
      shoppingListList.addShoppingList(shoppingListName);
      let shoppingListCreated: any;
      shoppingListList.getLastShoppingList().then((shoppingList) => {
        shoppingListCreated = shoppingList;
        cy.wrap(shoppingListCreated).find(shoppingListList.getGoToShoppingListButton())
          .should("contain.text", shoppingListName);
        cy.wrap(shoppingListCreated).find(shoppingListList.getDeleteShoppingListButton());
        cy.wrap(shoppingListCreated).find(shoppingListList.getEditShoppingListButton());
        shoppingListList.deleteLastShoppingList();
        let finalNumberOfShoppingList: any;
        shoppingListList.getNumberOfShoppingLists().then((finalLength) => {
          finalNumberOfShoppingList = finalLength;
          assert.equal(finalNumberOfShoppingList, initialNumberOfShoppingList, "The shopping list that was recent added was not deleted")
        });
      });
    });
  });
});
