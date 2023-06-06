import {ShoppingListList} from "../page/index";
import {ShoppingList} from "../page/index";
import {SimpleItemAdd} from "../page/index";

let shoppingListList: ShoppingListList;
let shoppingList = new ShoppingList();
let simpleItemAdd = new SimpleItemAdd();
const endpoint = "https://polite-bush-05fb25610.3.azurestaticapps.net";
describe("Verifying the creation of a item", () => {

    beforeEach(() => {
      cy.visit(endpoint);
      shoppingListList = new ShoppingListList();
      shoppingList = new ShoppingList();
      simpleItemAdd = new SimpleItemAdd();
    
      cy.wait(2000);
    });
  
    it("should create a item successfully with name and comment",  () => {
        let shoppingListName = "Shopping list test"
        shoppingListList.addShoppingList(shoppingListName);
        let shoppingListCreated: any;
        shoppingListList.getLastShoppingList().then((shoppingListNew) => {
            shoppingListCreated = shoppingListNew;

            cy.wrap(shoppingListCreated)
            .find(shoppingListList.getGoToShoppingListButton())
            .should("contain.text", shoppingListName)
            .click();

            cy.wait(2000);   
            let initialNumberOfItemList: any;
            shoppingList.getNumberOfItems().then((num) => {
                initialNumberOfItemList = num;

                shoppingList.addItem();
                let itemName = "Orange 2k"
                let itemComment = "For juice"
                simpleItemAdd.addItem(itemName,itemComment);
                    shoppingList.getNumberOfItems().then((num) => {
                    let numberOfItemListAfterAdd = num;
                    assert.equal(initialNumberOfItemList + 1, numberOfItemListAfterAdd, "The item was not added");
                    shoppingList.deleteLastListGroupItem();
                });
            });
        });    
    });
    it("should create a item successfully with name",  () => {
        let shoppingListName = "Shopping list test"
        shoppingListList.addShoppingList(shoppingListName);
        let shoppingListCreated: any;
        shoppingListList.getLastShoppingList().then((shoppingListNew) => {
            shoppingListCreated = shoppingListNew;

            cy.wrap(shoppingListCreated)
            .find(shoppingListList.getGoToShoppingListButton())
            .should("contain.text", shoppingListName)
            .click();

            cy.wait(2000);   
            let initialNumberOfItemList: any;
            shoppingList.getNumberOfItems().then((num) => {
                initialNumberOfItemList = num;

                shoppingList.addItem();
                let itemName = "Orange 2k"
                let itemComment = ""
                simpleItemAdd.addItem(itemName,itemComment);
                    shoppingList.getNumberOfItems().then((num) => {
                    let numberOfItemListAfterAdd = num;
                    assert.equal(initialNumberOfItemList + 1, numberOfItemListAfterAdd, "The item was not added");
                    shoppingList.deleteLastListGroupItem();
                });
            });
        });    
    });

    it("should create a item successfully even when the item name is repeated",  () => {
        let shoppingListName = "Shopping list test"
        shoppingListList.addShoppingList(shoppingListName);
        let shoppingListCreated: any;
        shoppingListList.getLastShoppingList().then((shoppingListNew) => {
            shoppingListCreated = shoppingListNew;

            cy.wrap(shoppingListCreated)
            .find(shoppingListList.getGoToShoppingListButton())
            .should("contain.text", shoppingListName)
            .click();

            cy.wait(2000);   
            let initialNumberOfItemList: any;
            shoppingList.getNumberOfItems().then((num) => {
                initialNumberOfItemList = num;

                shoppingList.addItem();
                let itemName = "Orange 2k"
                let itemComment = ""
                simpleItemAdd.addItem(itemName,itemComment);
                cy.wait(2000);  
                shoppingList.addItem();
                let itemNameRepeated = "Orange 2k"
                let itemCommentRepeated = ""
                simpleItemAdd.addItem(itemNameRepeated,itemCommentRepeated);
                shoppingList.getNumberOfItems().then((num) => {
                    let numberOfItemListAfterAdd = num;
                    assert.equal(initialNumberOfItemList + 2, numberOfItemListAfterAdd, "The item was not added");
                    shoppingList.deleteLastListGroupItem();
                    cy.wait(2000);  
                    shoppingList.deleteLastListGroupItem();
                });
            });
        });    
    });

    it('should show an error message when the text field is empty',  () => {
        let errorMessage = "must not be blank";
        let shoppingListName = "Shopping list test"
        shoppingListList.addShoppingList(shoppingListName);
        let shoppingListCreated: any;
        shoppingListList.getLastShoppingList().then((shoppingListNew) => {
            shoppingListCreated = shoppingListNew;

            cy.wrap(shoppingListCreated)
            .find(shoppingListList.getGoToShoppingListButton())
            .should("contain.text", shoppingListName)
            .click();

            cy.wait(2000);  
            
            let initialNumberOfItemList: any;
            shoppingList.getNumberOfItems().then((num) => {
                initialNumberOfItemList = num;

                cy.get(shoppingList.getAddItemButton()).click()
                cy.get(simpleItemAdd.getItemNameInput()).clear()
                cy.wait(2000)
                cy.get(simpleItemAdd.getCreateItemButton()).click()
                cy.get(simpleItemAdd.getErrorMessage()).should("contain.text", errorMessage);
                cy.wait(1000)
                cy.get(simpleItemAdd.getBackButton()).click()
                shoppingList.getNumberOfItems().then((num) => {
                    let numberOfItemListAfterAdd = num;
                    assert.equal(initialNumberOfItemList , numberOfItemListAfterAdd, "The item was not added");
                });
            });

        });

      });
      afterEach(() => {
        shoppingList.goToHome();
        shoppingListList.deleteLastShoppingList();
      });
  
  });