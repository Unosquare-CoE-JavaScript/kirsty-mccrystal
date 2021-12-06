// Template Method pattern

// decomposed into common parts & specifics
// Allow use to define the skeleton of the algroithm with
// concrete implementations defined in subclasses

// Template Method

class Game {
  constructor(numberOfPlayers) {
    this.numberOfPlayers = numberOfPlayers
    this.currentPlayer = 0
  }

  run() {
    // Template method
    this.start();
    while (!this.haveWinner) {
      this.takeTurn();
    }
    console.log(`Player ${this.winningPlayer} wins.`)
  }

  // Template method
  start(){}
  get haveWinner(){}
  takeTurn(){}
  get winningPlayer(){}
}

class Chess extends Game {
  constructor() {
    super(2);
    this.maxTurns = 10;
    this.turn = 1;
  }

  start() {
    console.log('Starting a game of chess' + 
      `with ${this.numberOfPlayers} players`
    )
  }

  get haveWinner() {
    return this.turn === this.maxTurns;
  }

  takeTurn() {
    console.log(`Turn ${this.turn++} taken by ` +
    `player ${this.currentPlayer}`
    )
    this.currentPlayer = (this.currentPlayer + 1) % this.numberOfPlayers
  }

  get winningPlayer() {
    return this.currentPlayer
  }
}

let chess = new Chess()
chess.run()