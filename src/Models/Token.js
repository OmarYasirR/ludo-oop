export class Token {
  constructor(id, playerId, color) {
    this.id = id;
    this.playerId = playerId;
    this.color = color;
    this.safeCells = [8, 13, 21, 26, 34, 39, 47]
    this.position = -1; // -1 means in home
    this.isInHome = true;
    this.isInSafeZone = false;
    this.isFinished = false;
    this.canMove = false;
    this.pathIndex = -1;
    this.steps = 0;
    this.element = null;
    this.homeElement = null;
    this.parentElement = null;
  }
  async move(steps, path) {
    if (this.isFinished || this.position === -1 || this.position + steps > path.length) {
      return false;
    }
    let stepCount = 0
    return new Promise((resolve) => {
      const clearer = setInterval(() => {
        if(steps === stepCount){
          clearInterval(clearer)
          this.isInSafeZone = this.safeCells.includes(this.position)
          resolve(true)
          return
        }
        stepCount +=1
        this.updateTokenState(path)
      }, 400)
    })
  }

  updateTokenState(path) {
      this.position +=1
      const newPosition = this.position

      if(newPosition === path.length){
        this.position = path.length
        this.isFinished = true;
        this.homeElement.appendChild(this.element)
        this.canMove = false;
        return;
      }
      const newCell = path[newPosition];
      if (!newCell) {
        return false
      };
      newCell.appendChild(this.element)
  }

  reset(path) {
    const clearer = setInterval(() => {
      if(this.position === 0){
        clearInterval(clearer)

        if(!this.parentElement){
          return
        }
        this.parentElement.appendChild(this.element)
        this.position = -1;
        this.isInHome = true;
        this.isInSafeZone = false;
        this.isFinished = false;
        this.canMove = false;
        this.pathIndex = -1;
        this.steps = 0;
        return
      }

      this.position -=1
      const newPosition = this.position
      
      const newCell = path[newPosition];
      if (!newCell) {
        return false
      };
      newCell.appendChild(this.element)
      
    }, 200)
    
  }
}
