class SimpleItemEdit{
  private readonly updateItemButton: string;
  private readonly errorMessage: string
  private readonly itemNameInput: string;
  private readonly itemCommentInput: string;

  constructor() {
    this.updateItemButton = "[data-test='update-item-btn']";
    this.errorMessage = "[data-test='name-error-message']";
    this.itemNameInput = "[data-test='name-item-input']";
    this.itemCommentInput = "[data-test='comment-item-input']";
  }

  public updateItem(itemName: string,itemComment: string){
    cy.get(this.itemNameInput).clear().type(itemName)
    cy.get(this.itemCommentInput).clear().type(itemComment)
    cy.wait(2000);
    cy.get(this.updateItemButton).click()
  }

  public getErrorMessage(){
    return this.errorMessage;
  }

  public getItemNameInput(){
    return this.itemNameInput;
  }

  public getItemCommentInput(){
    return this.itemCommentInput;
  }

  public getCreateItemButton(){
    return this.updateItemButton;
  }
}

export {SimpleItemEdit}
