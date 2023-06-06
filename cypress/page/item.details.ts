class ItemDetails {
  private readonly itemNameTitle: string;
  private readonly itemId: string;
  private readonly itemComment: string;
  private readonly isBought: string;
  private backButton: string;
  private homeButton: string;
  private editItemButton: string;
  private deleteItemButton: string;
  private cancelButtonInTheDeletionAlert: string;
  private readonly deleteButtonInTheDeletionAlert: string;

  constructor() {
    this.itemNameTitle = "[data-test='item-name']";
    this.itemId = "[data-test='item-id']";
    this.itemComment = "[data-test='item-comment']";
    this.isBought = "[data-test='item-bought']";
    this.backButton = "[data-test='back-button']";
    this.homeButton = "[data-test='home-button']";
    this.editItemButton = "[data-test='edit-item']";
    this.deleteItemButton = "[data-test='delete-item']";
    this.deleteButtonInTheDeletionAlert = ".dg-content-footer > .dg-btn.dg-btn--ok.dg-pull-right";
    this.cancelButtonInTheDeletionAlert = ".dg-content-footer > .dg-btn.dg-btn--cancel";
  }

  public editItem(){
    cy.get(this.editItemButton).click();
  }

  public deleteItem(){
    cy.get(this.deleteItemButton).click();
  }

  public goBack(){
    cy.get(this.backButton).click();
  }

  public goHome(){
    cy.get(this.homeButton).click();
  }

  public getItemName(){
    return this.itemNameTitle;
  }

  public getItemId(){
    return this.itemId;
  }

  public getItemComment(){
    return this.itemComment;
  }

  public isItemBought(){
    return this.isBought;
  }

  public getDeleteButtonInTheDeletionAlert(){
    return this.deleteButtonInTheDeletionAlert;
  }
  getItemNameFromItemPage() {
    return new Cypress.Promise((resolve) => {
      cy.get(this.itemNameTitle).invoke('text').then((itemName) => {
        resolve(itemName);
      });
    });
  }

  getItemCommentFromItemPage() {
    return new Cypress.Promise((resolve) => {
      cy.get(this.itemComment).invoke('text').then((comment) => {
        resolve(comment);
      });
    });
  }
  getItemBadgeFromItemPage() {
    return new Cypress.Promise((resolve) => {
      cy.get(this.isBought).invoke('text').then((badge) => {
        resolve(badge);
      });
    });
  }
}

export {ItemDetails}
