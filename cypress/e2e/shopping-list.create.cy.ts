import {ShoppingListList} from "../page/index";
import {SimpleShoppingListAdd} from "../page/index";

let shoppingListList: ShoppingListList;
const endpoint = "https://polite-bush-05fb25610.3.azurestaticapps.net";
describe("Verifying the creation of a shopping list", () => {

  beforeEach(() => {
    cy.visit(endpoint);
    shoppingListList = new ShoppingListList();
    cy.wait(2000);
  });

  it("should create a shopping list successfully", async () => {
    let initialNumberOfShoppingList: any;
    shoppingListList.getNumberOfShoppingLists().then((length) => {
      initialNumberOfShoppingList = length;
      let shoppingListName = "Shopping list test"
      shoppingListList.addShoppingList(shoppingListName);
      shoppingListList.getNumberOfShoppingLists().then((lengthAfterCreation) => {
        let numberOfShoppingListAfterCreation = lengthAfterCreation;
        assert.equal(initialNumberOfShoppingList+1, numberOfShoppingListAfterCreation, "The shopping list was not added")
        let shoppingListCreated: any;
        shoppingListList.getLastShoppingList().then((shoppingList) => {
          shoppingListCreated = shoppingList;
          cy.wrap(shoppingListCreated).find(shoppingListList.getGoToShoppingListButton())
            .should("contain.text", shoppingListName);
          cy.wrap(shoppingListCreated).find(shoppingListList.getDeleteShoppingListButton());
          cy.wrap(shoppingListCreated).find(shoppingListList.getEditShoppingListButton());
          shoppingListList.deleteLastShoppingList();
          cy.wait(2000);
          let finalNumberOfShoppingList: any;
          shoppingListList.getNumberOfShoppingLists().then((finalLength) => {
            finalNumberOfShoppingList = finalLength;
            assert.equal(initialNumberOfShoppingList, finalNumberOfShoppingList, "The shopping list that was recent added was not deleted")
          });
        });
      });
    });
  });

  it('should create a shopping list successfully even when the shopping list name is repeated ', () => {
    let initialNumberOfShoppingList: any;
    shoppingListList.getNumberOfShoppingLists().then((length) => {
      initialNumberOfShoppingList = length;
      let shoppingListName = "Shopping list test"
      shoppingListList.addShoppingList(shoppingListName);
      let shoppingListCreated1: any;
      shoppingListList.getLastShoppingList().then((shoppingList1) => {
        shoppingListCreated1 = shoppingList1;
        cy.wrap(shoppingListCreated1).find(shoppingListList.getGoToShoppingListButton())
          .should("contain.text", shoppingListName);
        cy.wrap(shoppingListCreated1).find(shoppingListList.getDeleteShoppingListButton());
        cy.wrap(shoppingListCreated1).find(shoppingListList.getEditShoppingListButton());
        shoppingListList.addShoppingList(shoppingListName);
        shoppingListList.getNumberOfShoppingLists().then((lengthAfterCreation) => {
          let numberOfShoppingListAfterCreation = lengthAfterCreation;
          assert.equal(initialNumberOfShoppingList+2, numberOfShoppingListAfterCreation, "The shopping lists were not added")
          let shoppingListCreated2: any;
          shoppingListList.getLastShoppingList().then((shoppingList2) => {
            shoppingListCreated2 = shoppingList2;
            cy.wrap(shoppingListCreated2).find(shoppingListList.getGoToShoppingListButton())
              .should("contain.text", shoppingListName);
            cy.wrap(shoppingListCreated2).find(shoppingListList.getDeleteShoppingListButton());
            cy.wrap(shoppingListCreated2).find(shoppingListList.getEditShoppingListButton());
            let finalNumberOfShoppingList: any;
            shoppingListList.deleteLastShoppingList();
            cy.wait(2000);
            shoppingListList.deleteLastShoppingList();
            cy.wait(2000);
            shoppingListList.getNumberOfShoppingLists().then((finalLength) => {
              finalNumberOfShoppingList = finalLength;
              assert.equal(initialNumberOfShoppingList, finalNumberOfShoppingList, "The shopping list that was recent added was not deleted")
            });
          });
        });
      });
    });
  });

  // it('should show an error message when the text field is empty', () => {
  //   let simpleShoppingListAdd = new SimpleShoppingListAdd();
  //   let initialNumberOfShoppingList: any;
  //   // let errorMessage = "must not be blank";
  //   let errorMessage = "no puede estar vacío";
  //   shoppingListList.getNumberOfShoppingLists().then((length) => {
  //     initialNumberOfShoppingList = length;
  //     cy.get(shoppingListList.getGoToAddItemListButton()).click()
  //     cy.get(simpleShoppingListAdd.getShoppingListNameInput()).clear()
  //     cy.get(simpleShoppingListAdd.getCreateShoppingListButton()).click()
  //     cy.get(simpleShoppingListAdd.getErrorMessage()).should("contain.text", errorMessage);
  //     simpleShoppingListAdd.goToHome();
  //     let finalNumberOfShoppingList: any;
  //     shoppingListList.getNumberOfShoppingLists().then((finalLength) => {
  //       finalNumberOfShoppingList = finalLength;
  //       assert.equal(initialNumberOfShoppingList, finalNumberOfShoppingList, "The shopping list that was recent added was not deleted")
  //     });
  //   });
  // });
});
