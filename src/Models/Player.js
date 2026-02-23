export class Player {
  constructor(id, name, color) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.path = []; 
    this.tokens = [];
    this.tokensParents = []
    this.home = null
    this.isActive = false;
    this.hasRolledSix = false;
    this.tokensInHome = 4;
    this.tokensFinished = 0;  
  } 
  canMove() {
    return this.isActive && this.tokens.some((token) => token.canMove);
  }
  getAvailableTokens() {
    return this.tokens.filter((token) => token.canMove);
  }
  resetTurn() {
    this.hasRolledSix = false;
  }
  checkWin() {
    return this.tokensFinished === 4;
  }
}
