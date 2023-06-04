class SimpleShoppingList {
  private createShoppingListButton: string;
  private readonly shoppingListNameInput: string;
  private readonly updateShoppingListButton: string;
  private readonly titleInEditShoppingList: string

  constructor() {
    this.shoppingListNameInput = "[data-test='name-shopping-list']";
    this.createShoppingListButton = "[data-test='add-shopping-list-btn']";
    this.updateShoppingListButton = "[data-test='update-shopping-list-btn']";
    this.titleInEditShoppingList = "[data-test='edit-title']";
  }

  public addShoppingList(shoppingListName: string){
    console.log(shoppingListName)
    cy.get(this.shoppingListNameInput).type(shoppingListName)
    cy.wait(2000);
    cy.get(this.createShoppingListButton).click()
  }

  public getTitleInEditShoppingList(){
    return this.titleInEditShoppingList;
  }

  public getShoppingListNameInput(){
    return this.shoppingListNameInput;
  }

  public getUpdateShoppingListButton(){
    return this.updateShoppingListButton;
  }

  public editShoppingList(newName:string){
    cy.get(this.getShoppingListNameInput()).clear().type(newName);
    cy.wait(2000);
  }

}

export {SimpleShoppingList}
