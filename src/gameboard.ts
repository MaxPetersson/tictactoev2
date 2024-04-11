import * as utility from "./utility";

let nrsInRow: number = 3;
let numberOfSquares: number = nrsInRow * nrsInRow;
let gameBoard: GameBoard;

class GamePiece {
  pieceDiv: HTMLDivElement;

  constructor() {
    this.pieceDiv = document.createElement("div") as HTMLDivElement;
    this.pieceDiv.id = "gamePiece";
  }

  setGamePiece(piece: string): void {
    if (piece == "x") {
      this.pieceDiv.appendChild(utility.fetchImage("x.jpg"));
    } else {
      this.pieceDiv.appendChild(utility.fetchImage("o.jpg"));
    }
  }
}

class GameSquare {
  gameSquare: HTMLDivElement;
  gamePiece!: GamePiece;
  isX: boolean = false;
  isO: boolean = false;
  mouseOver: EventListener;
  mouseLeave: EventListener;
  click: EventListener;

  constructor() {
    this.gameSquare = document.createElement("div") as HTMLDivElement;
    this.gameSquare.id = "gameSquare";

    this.mouseOver = () => {
      utility.highlight(this.gameSquare, "lightSalmon");
    };
    this.mouseLeave = () => {
      utility.highlight(this.gameSquare, "white");
    };
    this.click = () => {
      this.removeEventListeners();
      utility.highlight(this.gameSquare, "white");
      gameBoard.playTurn(this);
    };

    this.addEventListeners();
  }

  toString = (): string => {
    return this.isX ? "GS is: X" : "GS is: O";
  };

  removeEventListeners(): void {
    this.gameSquare.removeEventListener("mouseover", this.mouseOver);
    this.gameSquare.removeEventListener("mouseleave", this.mouseLeave);
    this.gameSquare.removeEventListener("click", this.click);
  }

  addEventListeners(): void {
    this.gameSquare.addEventListener("mouseover", this.mouseOver);
    this.gameSquare.addEventListener("mouseleave", this.mouseLeave);
    this.gameSquare.addEventListener("click", this.click);
  }

  placePiece(turn: String) {
    let gamePiece: GamePiece = new GamePiece();

    if (turn == "x") {
      gamePiece.setGamePiece("x");
      this.isX = true;
    } else {
      gamePiece.setGamePiece("o");
      this.isO = true;
    }

    this.gamePiece = gamePiece;
    this.gameSquare.appendChild(this.gamePiece.pieceDiv);
  }
}

class GameBoard {
  gameBoard: HTMLDivElement;
  boardSize: number = numberOfSquares;
  gameSquares: Array<GameSquare>;
  turn: string = "x";

  constructor(gameBoard_: HTMLDivElement) {
    this.gameBoard = gameBoard_;
    this.gameSquares = new Array(numberOfSquares);
  }

  init() {
    for (let i = 0; i < this.boardSize; i++) {
      this.gameSquares[i] = new GameSquare();
      this.gameBoard.appendChild(this.gameSquares[i].gameSquare);
    }
  }

  playTurn(gameSquare: GameSquare) {
    gameSquare.placePiece(this.turn);

    if (this.calculateVictory(gameSquare)) {
      this.gameSquares.forEach((element) => {
        element.removeEventListeners();
      });
    }

    // Next player's turn.
    this.turn = this.turn == "x" ? "o" : "x";
  }

  checkRow(square1: number, square2: number, square3: number): boolean {
    let isVictory: boolean = false;
    const oVictory: boolean =
      this.gameSquares[square1].isO &&
      this.gameSquares[square2].isO &&
      this.gameSquares[square3].isO;
    const xVictory: boolean =
      this.gameSquares[square1].isX &&
      this.gameSquares[square2].isX &&
      this.gameSquares[square3].isX;
    isVictory = oVictory || xVictory;
    if (isVictory) {
      utility.highlight(this.gameSquares[square1].gameSquare, "lightGreen");
      utility.highlight(this.gameSquares[square2].gameSquare, "lightGreen");
      utility.highlight(this.gameSquares[square3].gameSquare, "lightGreen");
    }
    return isVictory;
  }

  calculateVictory(gameSquare: GameSquare): boolean {
    console.log("GameSquare to check: " + gameSquare.toString());
    let isVictory: boolean = false;

    this.gameSquares.forEach(gameSquare => {
        console.log("gamesquare is" + gameSquare.isX);
    });

    isVictory = isVictory || this.checkRow(0, 1, 2);
    isVictory = isVictory || this.checkRow(3, 4, 5);
    isVictory = isVictory || this.checkRow(6, 7, 8);
    isVictory = isVictory || this.checkRow(0, 3, 6);
    isVictory = isVictory || this.checkRow(1, 4, 7);
    isVictory = isVictory || this.checkRow(2, 5, 8);
    isVictory = isVictory || this.checkRow(0, 4, 8);
    isVictory = isVictory || this.checkRow(2, 4, 6);
    return isVictory;
  }
}

export function gameboardInit(element: HTMLDivElement) {
  gameBoard = new GameBoard(element);

  gameBoard.init();
}
