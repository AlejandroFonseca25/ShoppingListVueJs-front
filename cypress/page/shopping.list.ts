class ShoppingList{
  private addItemButton: string;
  private editButton: string;
  private deleteButton: string;
  private buyButton: string;
  private cancelButtonInTheDeletionAlert: string;
  private readonly deleteButtonInTheDeletionAlert: string;
  private homeButton: string;
  private readonly shoppingListName: string;
  private readonly numberOfItems: string;
  private readonly itemsList: string;
  private readonly itemName: string;
  private readonly itemComment: string;
  private editItemButton: string;
  private deleteItemButton: string;
  private itemRow : string;

  constructor() {
    this.shoppingListName = "[data-test='shopping-list-name']";
    this.itemsList = "[data-test='list-group-items']";
    this.addItemButton = "[data-test='add-item-button']"
    this.editButton = "[data-test='edit-button']";
    this.deleteButton = "[data-test='delete-button']";
    this.buyButton="[data-test='buy-button']";
    this.numberOfItems = "[data-test='number-of-items']";
    this.itemName = "[data-test='item-name']";
    this.itemComment = "[data-test='item-comment']";
    this.editItemButton = "[data-test='edit-item']";
    this.deleteItemButton = "[data-test='delete-item']";
    this.deleteButtonInTheDeletionAlert = ".dg-content-footer > .dg-btn.dg-btn--ok.dg-pull-right";
    this.cancelButtonInTheDeletionAlert = ".dg-content-footer > .dg-btn.dg-btn--cancel";
    this.homeButton = "[data-test='home-button']";
    this.itemRow = ".col-md-7";
  }

  public addItem(){
    cy.get(this.addItemButton).click()
  }

  public editItem(){
    cy.get(this.editItemButton).click()
  }
  public buyItem(){
    cy.get(this.buyButton).click()
  }
  public deleteItem(){
    cy.get(this.deleteItemButton).click()
  }

  public editShoppingList(){
    cy.get(this.editButton).click()
  }

  public deleteShoppingList(){
    cy.get(this.deleteButton).click();
  }

  public goToHome(){
    cy.get(this.homeButton).click();
    cy.wait(2000);
  }

  public getShoppingListName(){
    return this.shoppingListName;
  }

  public deleteLastListGroupItem() {
    cy.wait(2000);
    // @ts-ignore
    this.getLastListGroupItem().then((lastItem: JQuery<HTMLElement>) => {
      cy.wrap(lastItem)
        .find(this.deleteItemButton)
        .click();
    })
    cy.wait(2000);
    cy.get(this.deleteButtonInTheDeletionAlert).click();
  }

  public getNumberOfItems(): Promise<number> {
    return new Cypress.Promise((resolve) => {
      cy.get(this.numberOfItems)
        .invoke('text')
        .then((text) => {
          resolve(parseInt(text));
        });
    });
  }

  public getLastListGroupItem() {
    return new Cypress.Promise((resolve) => {
      cy.get(this.itemsList)
        .find('.list-group-item')
        .eq(-1)
        .then((lastItem) => {
          resolve(lastItem);
        });
    });
  }

  public clickItemNameInLastItem() {
    this.getLastListGroupItem().then((lastItem) => {
      cy.wrap(lastItem)
        .find(this.itemName)
        .click();
    });
  }

  public clickItemBuy() {
    this.getLastListGroupItem().then((lastItem) => {
      cy.wrap(lastItem)
        .find(this.buyButton)
        .click();
    });
  }

  public getDeleteButtonInTheDeletionAlert(){
    return this.deleteButtonInTheDeletionAlert;
  }

  public getAddItemButton(){
    return this.addItemButton;
  }
  
  public getCancelButtonInTheDeletionAlert(){
    return this.cancelButtonInTheDeletionAlert;
  }

  public getItemName(){
    return cy.get(this.itemName);
  }

  public getItemComment(){
    return cy.get(this.itemComment);
  }

  public getItemRow(){
    return cy.get(this.itemRow);
  }
}

export {ShoppingList}

