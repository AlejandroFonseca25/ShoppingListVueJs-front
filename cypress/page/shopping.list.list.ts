import {SimpleShoppingListAdd} from "../page/index";

class ShoppingListList{
  private goToAddItemListButton: string;
  private listOfShoppingLists: string;
  private deleteButtonInTheDeletionAlert: string;
  private cancelButtonInTheDeletionAlert: string;
  private readonly goToShoppingListButton: string;
  private readonly editShoppingListButton: string;
  private readonly deleteShoppingListButton: string;

  private simpleShoppingList: SimpleShoppingListAdd;

  constructor() {
    this.goToAddItemListButton = "[data-test='add-list-button']";
    this.listOfShoppingLists = "[data-test='shopping-list']";

    this.goToShoppingListButton = "a.btn.btn-outline-secondary";
    this.editShoppingListButton = "a.btn.btn-warning.btn-sm.mx-1";
    this.deleteShoppingListButton = "a.btn.btn-danger.btn-sm";
    this.deleteButtonInTheDeletionAlert = ".dg-content-footer > .dg-btn.dg-btn--ok.dg-pull-right";
    this.cancelButtonInTheDeletionAlert = ".dg-content-footer > .dg-btn.dg-btn--cancel";
    this.simpleShoppingList = new SimpleShoppingListAdd();
  }

  public addShoppingList(shoppingListName: string){
    cy.get(this.goToAddItemListButton).click()
    cy.wait(2000);
    this.simpleShoppingList.addShoppingList(shoppingListName);
    cy.wait(2000);
  }

  public deleteLastShoppingList(){
    // @ts-ignore
    this.getLastShoppingList().then((lastList: JQuery<HTMLElement>) => {
      cy.wrap(lastList)
        .find(this.deleteShoppingListButton)
        .click();
    })
    cy.get(this.deleteButtonInTheDeletionAlert).click();
  }

  public getLastShoppingList(){
    return new Cypress.Promise((resolve) => {
      cy.get(this.listOfShoppingLists)
        .find('li')
        .eq(-1)
        .then((lastList) => {
          resolve(lastList);
        });
    });
  }

  public getNumberOfShoppingLists() {
    return new Cypress.Promise((resolve) => {
      cy.get(this.listOfShoppingLists)
        .find('li')
        .its('length')
        .then((length) => {
          resolve(length);
        });
    });
  }

  public getGoToShoppingListButton(){
    return this.goToShoppingListButton;
  }

  public getDeleteShoppingListButton(){
    return this.deleteShoppingListButton;
  }

  public getEditShoppingListButton(){
    return this.editShoppingListButton;
  }

  public getCancelButtonInTheDeletionAlert(){
    return this.cancelButtonInTheDeletionAlert;
  }

  public getGoToAddItemListButton(){
    return this.goToAddItemListButton;
  }
}

export {ShoppingListList}
