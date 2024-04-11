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
  placedTile: "X" | "O" | null;
  mouseOver: EventListener;
  mouseLeave: EventListener;
  click: EventListener;

  constructor() {
    this.gameSquare = document.createElement("div") as HTMLDivElement;
    this.gameSquare.id = "gameSquare";
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

  placePiece(turn: String) {
    let gamePiece: GamePiece = new GamePiece();

    if (turn === "X") {
      gamePiece.setGamePiece("x");
      this.placedTile = "X";
    } else {
      gamePiece.setGamePiece("o");
      this.placedTile = "O";
    }

    this.gamePiece = gamePiece;
    this.gameSquare.appendChild(this.gamePiece.pieceDiv);
  }
}

class GameBoard {
  gameBoard: HTMLDivElement;
  boardSize: number = numberOfSquares;
  gameSquares: Array<GameSquare>;
  turn: "X" | "O" = "X";
  private board!: GameSquare[][];

  constructor(gameBoard_: HTMLDivElement) {
    this.gameBoard = gameBoard_;
    this.gameSquares = new Array(numberOfSquares);

    this.board = [];
    for (let i = 0; i < 3; i++) {
      this.board.push([]);
      for (let j = 0; j < 3; j++) {
        this.board[i].push(new GameSquare());
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

  playTurn(gameSquare: GameSquare) {
    gameSquare.placePiece(this.turn);

    if (this.calculateVictory()) {
      this.removeAllEventListeners();
    }

    // Next player's turn.
    this.turn = this.turn === "X" ? "O" : "X";
  }

  checkRow(square1: number, square2: number, square3: number): boolean {
    let isVictory: boolean =
      this.gameSquares[square1].placedTile == this.turn &&
      this.gameSquares[square2].placedTile == this.turn &&
      this.gameSquares[square3].placedTile == this.turn;
    if (isVictory) {
      utility.highlight(this.gameSquares[square1].gameSquare, "lightGreen");
      utility.highlight(this.gameSquares[square2].gameSquare, "lightGreen");
      utility.highlight(this.gameSquares[square3].gameSquare, "lightGreen");
    }
    return isVictory;
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
  gameBoard = new GameBoard(element);
}
