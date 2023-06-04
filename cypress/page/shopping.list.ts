class ShoppingList{
  private editButton: string;
  private deleteButton: string;
  private cancelButtonInTheDeletionAlert: string;
  private deleteButtonInTheDeletionAlert: string;
  private homeButton: string;
  private readonly shoppingListName: string;
  private readonly numberOfItems: string;

  constructor() {
    this.shoppingListName = "[data-test='shopping-list-name']";
    this.editButton = "[data-test='edit-button']";
    this.deleteButton = "[data-test='delete-button']";
    this.numberOfItems = "[data-test='number-of-items']";
    this.deleteButtonInTheDeletionAlert = ".dg-content-footer > .dg-btn.dg-btn--ok.dg-pull-right";
    this.cancelButtonInTheDeletionAlert = ".dg-content-footer > .dg-btn.dg-btn--cancel";
    this.homeButton = "[data-test='home-button']";
  }

  public editShoppingList(){
    cy.get(this.editButton).click()
  }

  public deleteShoppingList(){
    cy.get(this.deleteButton).click();
  }

  public goToHome(){
    cy.get(this.homeButton).click();
  }

  public getShoppingListName(){
    return this.shoppingListName;
  }

  public getNumberOfItems(){
    return this.numberOfItems;
  }

  public getDeleteButtonInTheDeletionAlert(){
    return this.deleteButtonInTheDeletionAlert;
  }
}

export {ShoppingList}

