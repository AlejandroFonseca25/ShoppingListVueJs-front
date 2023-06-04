class ShoppingList {
  private shoppingListNameInput: string;
  private createShoppingListButton: string;
  private updateShoppingListButton: string;
  private titleInEditShoppingList: string

  constructor() {
    this.shoppingListNameInput = "[data-test='name-shopping-list']";
    this.createShoppingListButton = "[data-test='add-shopping-list-btn']";
    this.updateShoppingListButton = "[data-test='update-shopping-list-btn']";
    this.titleInEditShoppingList = "[data-test='edit-title']";
  }

  public addShoppingList(shoppingListName: string){
    console.log(shoppingListName)
    cy.get(this.shoppingListNameInput).type(shoppingListName)
    cy.wait(1000);
    cy.get(this.createShoppingListButton).click()
  }

}

export {ShoppingList}
