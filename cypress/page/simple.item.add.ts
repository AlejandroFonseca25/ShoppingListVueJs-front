class SimpleItemAdd{
  private readonly createItemButton: string;
  private readonly errorMessage: string
  private readonly itemNameInput: string;
  private readonly itemCommentInput: string;
  
    constructor() {
        this.createItemButton = "[data-test='add-item-btn']";
        this.errorMessage = "[data-test='name-error-message']";
        this.itemNameInput = "[data-test='name-item']";
        this.itemCommentInput = "[data-test='comment-item']";
    }
  
    public addItem(itemName: string,itemComment: string){
        cy.get(this.itemNameInput).clear().type(itemName)
        cy.get(this.itemCommentInput).clear().type(itemComment)
        cy.wait(2000);
        cy.get(this.createItemButton).click()
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
        return this.createItemButton;
      }
  }
  
  export {SimpleItemAdd}