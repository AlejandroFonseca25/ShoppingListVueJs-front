class SimpleItemEdit{
  private readonly updateItemButton: string;
  private readonly errorMessage: string
  private readonly itemNameInput: string;
  private readonly itemCommentInput: string;
  private backButton: string;
  private homeButton: string;


  constructor() {
    this.updateItemButton = "[data-test='update-item-btn']";
    this.errorMessage = "[data-test='name-error-message']";
    this.itemNameInput = "[data-test='name-item-input']";
    this.itemCommentInput = "[data-test='comment-item-input']";
    this.backButton = "[data-test='back-button']";
    this.homeButton = "[data-test='home-button']";
  }

  public updateItem(itemName: string,itemComment: string){
    if (itemName == "") {
      cy.get(this.itemNameInput).clear()
    } else {
      cy.get(this.itemNameInput).clear().type(itemName)
    }
    if (itemComment == "") {
      cy.get(this.itemCommentInput).clear()
    } else {
      cy.get(this.itemCommentInput).clear().type(itemComment)
    }
    cy.wait(2000);
    cy.get(this.updateItemButton).click()
  }

  public getErrorMessage(){
    return cy.get(this.errorMessage);
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

  public goBack(){
    cy.get(this.backButton).click();
  }

  public goHome(){
    cy.get(this.homeButton).click();
  }
}

export {SimpleItemEdit}
