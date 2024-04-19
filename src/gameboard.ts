import * as utility from "./utility";

class GamePiece {
  pieceDiv!: HTMLDivElement;

  constructor(turn: "X" | "O") {
    turn == "X" ? this.placeX() : this.placeO();
  }

  placeX() {
    this.pieceDiv = document.createElement("div") as HTMLDivElement;

    // Create two additional div's and give them X-Right and X-Left classes
    // respectively and append them to the pieceDiv which is already appended
    // to a parent div.
    let pieceDivR = document.createElement("div") as HTMLDivElement;
    let pieceDivL = document.createElement("div") as HTMLDivElement;

    pieceDivR.classList.add("gamePiece-X-Right");
    pieceDivL.classList.add("gamePiece-X-Left");

    this.pieceDiv.appendChild(pieceDivR);
    this.pieceDiv.appendChild(pieceDivL);
  }

  placeO() {
    this.pieceDiv = document.createElement("div") as HTMLDivElement;

    // "O" only needs one div (using radius to create a circle).
    this.pieceDiv.classList.add("gamePiece-O");
  }
}

class GameSquare {
  gameSquare: HTMLDivElement;
  gamePiece!: GamePiece;
  placedTile: "X" | "O" | null;
  private mouseOver: EventListener;
  private mouseLeave: EventListener;
  private click: EventListener;

  constructor(gameBoard: GameBoard) {
    this.gameSquare = document.createElement("div") as HTMLDivElement;
    this.gameSquare.classList.add("gameSquare");
    this.placedTile = null;

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
    return this.placedTile != null ? this.placedTile : "Empty tile!";
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

  placePiece(turn: "X" | "O") {
    let gamePiece: GamePiece = new GamePiece(turn);

    if (turn === "X") {
      //gamePiece.setGamePiece("x");
      this.placedTile = "X";
    } else {
      //gamePiece.setGamePiece("o");
      this.placedTile = "O";
    }

    this.gamePiece = gamePiece;
    this.gameSquare.appendChild(this.gamePiece.pieceDiv);
  }
}

class GameBoard {
  gameBoard: HTMLDivElement;
  boardSize: number = 9;
  turn: "X" | "O" = "X";
  private board!: GameSquare[][];

  constructor(gameBoard_: HTMLDivElement) {
    this.gameBoard = gameBoard_;
    this.board = [];

    for (let i = 0; i < 3; i++) {
      this.board.push([]);
      for (let j = 0; j < 3; j++) {
        this.board[i].push(new GameSquare(this));
        this.gameBoard.appendChild(this.board[i][j].gameSquare);
      }
    }
  }

  removeAllEventListeners() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.board[i][j].removeEventListeners();
      }
    }
  }

  isBoardFull() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j].placedTile == null) {
          return false;
        }
      }
    }
    return true;
  }

  resetGameBoard() {
    console.log("trying to reset gameboard");
  }

  playTurn(gameSquare: GameSquare) {
    gameSquare.placePiece(this.turn);

    if (this.calculateVictory()) {
      this.removeAllEventListeners();
      this.resetGameBoard();
    } else {
      if (this.isBoardFull()) {
        this.resetGameBoard();
      }
    }

    // Next player's turn.
    this.turn = this.turn === "X" ? "O" : "X";
  }

  checkColumns(): boolean {
    for (let i = 0; i < 3; i++) {
      if (
        this.board[0][i].placedTile !== null &&
        this.board[0][i].placedTile === this.board[1][i].placedTile &&
        this.board[0][i].placedTile === this.board[2][i].placedTile
      ) {
        utility.highlight(this.board[0][i].gameSquare, "lightGreen");
        utility.highlight(this.board[1][i].gameSquare, "lightGreen");
        utility.highlight(this.board[2][i].gameSquare, "lightGreen");
        return true;
      }
    }
    return false;
  }

  checkRows(): boolean {
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0].placedTile !== null &&
        this.board[i][0].placedTile === this.board[i][1].placedTile &&
        this.board[i][0].placedTile === this.board[i][2].placedTile
      ) {
        utility.highlight(this.board[i][0].gameSquare, "lightGreen");
        utility.highlight(this.board[i][1].gameSquare, "lightGreen");
        utility.highlight(this.board[i][2].gameSquare, "lightGreen");
        return true;
      }
    }
    return false;
  }

  checkDiagonals(): boolean {
    if (
      this.board[0][0].placedTile !== null &&
      this.board[0][0].placedTile === this.board[1][1].placedTile &&
      this.board[0][0].placedTile === this.board[2][2].placedTile
    ) {
      utility.highlight(this.board[0][0].gameSquare, "lightGreen");
      utility.highlight(this.board[1][1].gameSquare, "lightGreen");
      utility.highlight(this.board[2][2].gameSquare, "lightGreen");
      return true;
    } else if (
      this.board[0][2].placedTile !== null &&
      this.board[0][2].placedTile === this.board[1][1].placedTile &&
      this.board[0][2].placedTile === this.board[2][0].placedTile
    ) {
      utility.highlight(this.board[0][2].gameSquare, "lightGreen");
      utility.highlight(this.board[1][1].gameSquare, "lightGreen");
      utility.highlight(this.board[2][0].gameSquare, "lightGreen");
      return true;
    } else {
      return false;
    }
  }

  calculateVictory(): boolean {
    return this.checkDiagonals() || this.checkColumns() || this.checkRows();
  }
}

export function gameboardInit(element: HTMLDivElement) {
  new GameBoard(element);
}
