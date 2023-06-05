class SimpleShoppingListEdit{
  private readonly errorMessage: string
  private readonly shoppingListNameInput: string;
  private readonly updateShoppingListButton: string;
  private readonly titleInEditShoppingList: string
  private homeButton: string;

  constructor() {
    this.updateShoppingListButton = "[data-test='update-shopping-list-btn']";
    this.titleInEditShoppingList = "[data-test='edit-title']";
    this.shoppingListNameInput = "[data-test='name-shopping-list']";
    this.errorMessage = "[data-test='edit-error-message']";
    this.homeButton = "[data-test='home-button']";
  }

  public getTitleInEditShoppingList(){
    return this.titleInEditShoppingList;
  }

  public getUpdateShoppingListButton(){
    return this.updateShoppingListButton;
  }

  public editShoppingList(newName:string){
    cy.wait(2000);
    cy.get(this.shoppingListNameInput).clear().type(newName);
    cy.wait(2000);
  }

  public getErrorMessage(){
    return this.errorMessage;
  }

  public getShoppingListNameInput(){
    return this.shoppingListNameInput;
  }

  public goToHome(){
    cy.get(this.homeButton).click();
    cy.wait(2000);
  }
}
export {SimpleShoppingListEdit}
