let nrsInRow: number = 3;
let numberOfSquares: number = nrsInRow * nrsInRow;
let gameBoard: GameBoard;

class GamePiece {
    pieceDiv: HTMLDivElement;

    constructor() {
        this.pieceDiv = document.createElement('div') as HTMLDivElement;
        this.pieceDiv.id = 'gamePiece';
    }

    fetchImage(imageName: string): HTMLImageElement {
        let imgElement = document.createElement("img");
        imgElement.setAttribute("src", "../images/" + imageName);
        imgElement.setAttribute("height", "100");
        imgElement.setAttribute("width", "100");

        return imgElement;
    }

    setGamePiece(piece: string): void {
        if (piece == 'x') {
            this.pieceDiv.appendChild(this.fetchImage("x.jpg"));
        }
        else {
            this.pieceDiv.appendChild(this.fetchImage("o.jpg"));
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
        this.gameSquare = document.createElement('div') as HTMLDivElement;
        this.gameSquare.id = 'gameSquare';

        this.mouseOver = () => { this.highlight() };
        this.mouseLeave = () => { this.unhighlight() };
        this.click = () => {
            this.removeEventListeners();
            this.unhighlight();
            gameBoard.playTurn(this);
        };

        this.addEventListeners();
    }

    highlight(): void {
        this.gameSquare.style.backgroundColor = 'lightSalmon';
    }

    highlightVictory(): void {
        this.gameSquare.style.backgroundColor = 'lightGreen';
    }

    unhighlight(): void {
        this.gameSquare.style.backgroundColor = 'white';
    }

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

    resetGameSquare(): void {
        let gamePiece = this.gameSquare.firstChild;
        if (gamePiece) {
            this.gameSquare.removeChild(gamePiece);
            this.addEventListeners();
        }
    }

    setGamePiece(gamePiece_: GamePiece): void {
        this.gamePiece = gamePiece_;
    }

    renderGamePiece(): void {
        if (this.gamePiece){
            this.gameSquare.appendChild(this.gamePiece.pieceDiv);
        }
    }
}

class GameBoard {
    gameBoard: HTMLDivElement;
    boardSize: number;
    gameSquares: Array<GameSquare>;
    turn: string = "x";

    constructor(gameBoard_: HTMLDivElement) {
        this.gameBoard = gameBoard_;
        this.boardSize = numberOfSquares;
        this.gameSquares = new Array(numberOfSquares)
    }

    init() {
        for (let i = 0; i < this.boardSize; i++) {
            this.gameSquares[i] = new GameSquare();
            this.gameBoard.appendChild(this.gameSquares[i].gameSquare);
        }
    }

    reset() {
        this.gameSquares.forEach((gameSquare: GameSquare) => gameSquare.resetGameSquare());
        this.turn = "x";
    }

    playTurn(gameSquare: GameSquare) {
        let gamePiece: GamePiece = new GamePiece();

        if (this.turn == "x") {
            gamePiece.setGamePiece('x')
            gameSquare.isX = true;
        }
        else {
            gamePiece.setGamePiece('o')
            gameSquare.isO = true;
        }

        gameSquare.setGamePiece(gamePiece);
        gameSquare.renderGamePiece();

        if (this.calculateVictory()) {
            this.gameSquares.forEach(element => {
                element.removeEventListeners();
            });
        }

        // Next player's turn.
        this.turn = this.turn == "x" ? "o" : "x";
    }

    checkRow(square1: number, square2: number, square3: number): boolean {
        let isVictory: boolean = false;
        const yVictory: boolean = this.gameSquares[square1].isO && this.gameSquares[square2].isO && this.gameSquares[square3].isO;
        const oVictory: boolean = this.gameSquares[square1].isX && this.gameSquares[square2].isX && this.gameSquares[square3].isX;
        isVictory = yVictory || oVictory;
        if (isVictory){
            this.gameSquares[square1].highlightVictory();
            this.gameSquares[square2].highlightVictory();
            this.gameSquares[square3].highlightVictory();
        }
        return isVictory;
    }

    calculateVictory(): boolean {
        let isVictory: boolean = false;

        isVictory = isVictory || this.checkRow(0,1,2);
        isVictory = isVictory || this.checkRow(3,4,5);
        isVictory = isVictory || this.checkRow(6,7,8);
        isVictory = isVictory || this.checkRow(0,3,6);
        isVictory = isVictory || this.checkRow(1,4,7);
        isVictory = isVictory || this.checkRow(2,5,8);
        isVictory = isVictory || this.checkRow(0,4,8);
        isVictory = isVictory || this.checkRow(2,4,6);
        return isVictory;
    }
}

export function gameboardInit(element: HTMLDivElement) {
    gameBoard = new GameBoard(element);

    gameBoard.init();
}
