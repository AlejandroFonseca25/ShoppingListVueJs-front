class ShoppingList{
  private addItemButton: string;
  private editButton: string;
  private deleteButton: string;
  private cancelButtonInTheDeletionAlert: string;
  private readonly deleteButtonInTheDeletionAlert: string;
  private homeButton: string;
  private readonly shoppingListName: string;
  private readonly numberOfItems: string;
  private readonly itemName: string;
  private readonly itemComment: string;
  private editItemButton: string;
  private deleteItemButton: string;
  private itemRow : string;

  constructor() {
    this.shoppingListName = "[data-test='shopping-list-name']";
    this.addItemButton = "[data-test='add-item-button']"
    this.editButton = "[data-test='edit-button']";
    this.deleteButton = "[data-test='delete-button']";
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

  public getNumberOfItems(){
    return this.numberOfItems;
  }

  public getDeleteButtonInTheDeletionAlert(){
    return this.deleteButtonInTheDeletionAlert;
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

