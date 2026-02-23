import { Player } from "./Player";
import { Token } from "./Token";
import { Dice } from "./Dice";

export class Game {
  constructor(onUpdate) {
    this.players = [];
    this.currentPlayerIndex = 0;
    this.dice = new Dice();
    this.elements = [];
    this.tokensParents = [];
    this.gameState = "waiting"; // waiting, rolling, moving, finished
    this.winner = null;
    this.history = [];
    this.onUpdate = onUpdate; // UI updater
    this.initializeGame();
  }
  addElements(el) {
    this.elements = el;
    this.tokensParents = el[this.currentPlayerIndex].tokensParents;
    this.home = el[this.currentPlayerIndex].home;
    this.players.forEach((player, index) => {
      player.path = el[index].path;
      player.tokens.forEach((t, i) => {
        t.element = el[index].tokens[i];
        t.homeElement = el[index].tokensHome;
        t.parentElement = el[index].tokensParents[i];
      });
      player.tokensParents = el[index].tokensParents;
      player.home = el[index].home;
    });
  }

  initializeGame() {
    // Create players
    const colors = ["red", "green", "blue", "yellow"];
    const names = ["Player 1", "Player 2", "Player 3", "Player 4"];
    colors.forEach((color, index) => {
      const player = new Player(index, names[index], color);
      // Create tokens for player
      for (let i = 0; i < 4; i++) {
        const token = new Token(i, index, color);
        player.tokens.push(token);
      }
      this.players.push(player);
    });

    // Set first player active
    this.players[0].isActive = true;
    this.gameState = "waiting";
  }

  get currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }
  rollDice() {
    // function to update UI
    if (this.onUpdate) {
      this.onUpdate();
    }

    if (this.gameState !== "waiting" && this.gameState !== "rolling") return;
    this.gameState = "rolling";
    const diceValue = this.dice.roll();
    // Outting single Token automaticlly
    if (diceValue === 6 && this.currentPlayer.tokensInHome === 4) {
      this.outtingSingleToken();
      this.updateGameState();
      return;
    }

    this.updateTokenMovability(diceValue);

    // Check if player has any movable tokens
    if (!this.currentPlayer.canMove()) {
      this.nextTurn();
      return;
    }

    this.autoMovement(diceValue);

    this.gameState = "moving";
    this.addToHistory(
      `Player ${this.currentPlayerIndex + 1} rolled ${diceValue}`,
    );
    // If rolled 6, player gets another turn
    if (diceValue === 6) {
      this.currentPlayer.hasRolledSix = true;
    } else {
      this.currentPlayer.hasRolledSix = false;
    }
    return diceValue;
  }

  autoMovement(diceValue) {
    const canMoveTokens = this.currentPlayer.tokens.filter(
      (token) => token.canMove,
    );
    const token = canMoveTokens[0];
    const multibleToknInCell = canMoveTokens.every(
      (tokn) => tokn.position == token.position,
    );
    if (canMoveTokens.length === 1) {
      this.moveToken(token.id, diceValue);
      return;
    }

    if (multibleToknInCell) {
      this.moveToken(token.id, diceValue);
    }
  }

  outtingSingleToken() {
    const token = this.currentPlayer.tokens[0].element;
    this.currentPlayer.path[0].appendChild(token);
    this.currentPlayer.tokens[0].position = 0;
    this.currentPlayer.tokens[0].isInSafeZone = true;
    this.currentPlayer.tokens[0].isInHome = false;
    // this.currentPlayer.tokens[0].canMove = true;
    this.currentPlayer.tokensInHome = this.currentPlayer.tokensInHome - 1;
  }

  tokenClick(id) {
    this.updateGameState();
    const token = this.currentPlayer.tokens[id];
    if (token.isInHome) {
      this.currentPlayer.path[0].appendChild(token.element);
      this.currentPlayer.tokens[id].position = 0;
      this.currentPlayer.tokens[id].isInSafeZone = true;
      this.currentPlayer.tokens[id].isInHome = false;
      this.currentPlayer.tokensInHome = this.currentPlayer.tokensInHome - 1;
    } else {
      this.moveToken(id, this.dice.value);
    }
  }

  updateTokenMovability(diceValue) {
    this.currentPlayer.tokens.forEach((token) => {
      if (token.position + diceValue > this.currentPlayer.path.length) {
        token.canMove = false;
        return;
      }
      // Tokens in home can only move if dice is 6
      if (token.isInHome) {
        token.canMove = diceValue === 6;
      }
      // Tokens on board can move if not finished
      else if (!token.isFinished && !token.isInHome) {
        token.canMove = true;
      }
    });
  }

  async moveToken(tokenId, steps) {
    // this.updateTokenMovability(steps)
    const token = this.currentPlayer.tokens[tokenId];
    if (!token) {
      return false;
    }

    this.currentPlayer.tokens.forEach((tokn) => (tokn.canMove = false));

    const success = await token.move(steps, this.currentPlayer.path);
    if (success) {
      if (!token.isInSafeZone && !token.isFinished) {
        if(this.checkForCaptures(token)) return this.updateGameState()
      }

      this.updateGameState();

      // Check if token finished
      if (token.isFinished) {
        this.currentPlayer.tokensFinished++;
      }

      // If dice wasn't 6, end turn
      if (!this.dice.isSix()) {
        this.nextTurn();
      } else {
        // If rolled 6, player gets another roll
        this.gameState = "waiting";
        this.currentPlayer.tokens.forEach((t) => (t.canMove = false));
      }
      return true;
    }

    return false;
  }

  checkForCaptures(movedToken) {
    const cellChildren = Array.from(
      this.currentPlayer.path[movedToken.position].children,
    );

    const oldToken = cellChildren[0];
    const oldTokenColor = oldToken.getAttribute("id").split("-")[0];
    const oldTokenId = parseInt(oldToken.getAttribute("id").split("-")[1]);
    const hasStrangeToken = movedToken.color !== oldTokenColor

    if (cellChildren.length !== 2 || !hasStrangeToken) {
      return false;
    }

    this.players.forEach((player) => {
      if (player.color === oldTokenColor) {
        player.tokens.forEach((token, i) => {
          if (i === oldTokenId) {
            // Capture token
            token.reset(player.path);
            player.tokensInHome++;
            this.addToHistory(
              `Player ${movedToken.playerId + 1} captured Player ${
                player.id + 1
              }'s token`,
            );
          }
        });
      }
    });
    return true
  }

  updateGameState() {
    // Check for winner
    this.players.forEach((player) => {
      if (player.checkWin()) {
        this.gameState = "finished";
        this.winner = player;
        this.addToHistory(`Player ${player.id + 1} wins!`);
      }
    });

    // remove token movablity
    this.currentPlayer.tokens.forEach((token) => {
      token.canMove = false;
    });

    this.gameState = this.gameState === "finished" ? "finished" : "waiting";

    if (this.onUpdate) {
      this.onUpdate();
    }
  }

  nextTurn() {
    setTimeout(() => {
      this.currentPlayer.isActive = false;
      this.currentPlayer.resetTurn();
      this.currentPlayerIndex =
        (this.currentPlayerIndex + 1) % this.players.length;
      this.currentPlayer.isActive = true;
      this.gameState = "waiting";
      this.addToHistory(`Turn passed to Player ${this.currentPlayerIndex + 1}`);
      this.onUpdate();
    }, 200);
  }

  addToHistory(message) {
    this.history.push({
      timestamp: new Date().toLocaleTimeString(),
      message,
      player: this.currentPlayerIndex,
    });
    // Keep only last 50 moves
    if (this.history.length > 50) {
      this.history.shift();
    }
  }
  resetGame() {
    this.players = [];
    this.currentPlayerIndex = 0;
    this.dice = new Dice();
    this.gameState = "waiting";
    this.winner = null;
    this.history = [];
    this.initializeGame();
  }
}
