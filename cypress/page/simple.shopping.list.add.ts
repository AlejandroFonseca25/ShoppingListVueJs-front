class SimpleShoppingListAdd {
  private readonly createShoppingListButton: string;
  private readonly errorMessage: string
  private readonly shoppingListNameInput: string;
  private homeButton: string;

  constructor() {
    this.shoppingListNameInput = "[data-test='name-shopping-list']";
    this.createShoppingListButton = "[data-test='add-shopping-list-btn']";
    this.errorMessage = "[data-test='add-error-message']";
    this.homeButton = "[data-test='home-button']";
  }

  public addShoppingList(shoppingListName: string){
    cy.get(this.shoppingListNameInput).clear().type(shoppingListName)
    cy.wait(2000);
    cy.get(this.createShoppingListButton).click()
  }

  public getErrorMessage(){
    return this.errorMessage;
  }

  public goToHome(){
    cy.get(this.homeButton).click();
    cy.wait(2000);
  }

  public getShoppingListNameInput(){
    return this.shoppingListNameInput;
  }

  public getCreateShoppingListButton(){
    return this.createShoppingListButton;
  }
}

export {SimpleShoppingListAdd}
