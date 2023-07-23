var board = [];
var currentPlayer = "white";

function startGame() {
  createBoard();
  placePieces();
}

function createBoard() {
  var boardContainer = document.getElementById("board");
  for (var i = 0; i < 8; i++) {
    board[i] = [];
    for (var j = 0; j < 8; j++) {
      var square = document.createElement("div");
      square.className = "square " + ((i + j) % 2 === 0 ? "white" : "black");
      square.id = i + "," + j;
      square.onclick = handleSquareClick;
      boardContainer.appendChild(square);
      board[i][j] = null;
    }
  }
}

function placePieces() {
  for (var i = 0; i < 8; i++) {
    board[1][i] = new Pawn("black", 1, i);
    board[6][i] = new Pawn("white", 6, i);
  }
  board[0][0] = new Rook("black", 0, 0);
  board[0][7] = new Rook("black", 0, 7);
  board[7][0] = new Rook("white", 7, 0);
  board[7][7] = new Rook("white", 7, 7);
  board[0][1] = new Knight("black", 0, 1);
  board[0][6] = new Knight("black", 0, 6);
  board[7][1] = new Knight("white", 7, 1);
  board[7][6] = new Knight("white", 7, 6);
  board[0][2] = new Bishop("black", 0, 2);
  board[0][5] = new Bishop("black", 0, 5);
  board[7][2] = new Bishop("white", 7, 2);
  board[7][5] = new Bishop("white", 7, 5);
  board[0][3] = new Queen("black", 0, 3);
  board[7][3] = new Queen("white", 7, 3);
  board[0][4] = new King("black", 0, 4);
  board[7][4] = new King("white", 7, 4);
  drawPieces();
}

function drawPieces() {
    var squares = document.getElementsByClassName("square");
    for (var i = 0; i < squares.length; i++) {
    var squareId = squares[i].id.split(",");
    var piece = board[squareId[0]][squareId[1]];
    if (piece !== null) {
    var pieceImage = document.createElement("img");
    pieceImage.src = "pieces/" + piece.color + "_" + piece.type + ".png";
    squares[i].appendChild(pieceImage);
    }
    }
    }
    
    function handleSquareClick() {
    var row = parseInt(this.id.split(",")[0]);
    var col = parseInt(this.id.split(",")[1]);
    var piece = board[row][col];
    if (piece !== null && piece.color === currentPlayer) {
    clearSelections();
    this.classList.add("selected");
    var moves = piece.getMoves(board);
    for (var i = 0; i < moves.length; i++) {
    var move = moves[i];
    var moveId = move[0] + "," + move[1];
    var moveSquare = document.getElementById(moveId);
    moveSquare.classList.add("valid-move");
    }
    } else if (this.classList.contains("valid-move")) {
    var selectedSquare = document.getElementsByClassName("selected")[0];
    var selectedPiece = board[selectedSquare.id.split(",")[0]][selectedSquare.id.split(",")[1]];
    board[row][col] = selectedPiece;
    board[selectedSquare.id.split(",")[0]][selectedSquare.id.split(",")[1]] = null;
    drawPieces();
    clearSelections();
    currentPlayer = (currentPlayer === "white" ? "black" : "white");
    } else {
    clearSelections();
    }
    }
    
    function clearSelections() {
    var squares = document.getElementsByClassName("square");
    for (var i = 0; i < squares.length; i++) {
    squares[i].classList.remove("selected");
    squares[i].classList.remove("valid-move");
    }
    }
    
    function Piece(color, row, col) {
    this.color = color;
    this.row = row;
    this.col = col;
    }
    
    Piece.prototype.getMoves = function(board) {
    return [];
    }
    
    function Pawn(color, row, col) {
    Piece.call(this, color, row, col);
    this.type = "pawn";
    }
    
    Pawn.prototype = Object.create(Piece.prototype);
    Pawn.prototype.constructor = Pawn;
    
    Pawn.prototype.getMoves = function(board) {
    var moves = [];
    var direction = (this.color === "white" ? -1 : 1);
    var newRow = this.row + direction;
    if (newRow >= 0 && newRow <= 7 && board[newRow][this.col] === null) {
    moves.push([newRow, this.col]);
    if ((this.color === "white" && this.row === 6) || (this.color === "black" && this.row === 1)) {
    var doubleNewRow = this.row + 2 * direction;
    if (board[doubleNewRow][this.col] === null) {
    moves.push([doubleNewRow, this.col]);
    }
    }
    }
    if (this.col > 0 && board[newRow][this.col - 1] !== null && board[newRow][this.col - 1].color !== this.color) {
    moves.push([newRow, this.col - 1]);
    }
    if (this.col < 7 && board[newRow][this.col + 1] !== null && board[newRow][this.col + 1].color !== this.color) {
    moves.push([newRow, this.col + 1]);
    }
    return moves;
    }
    
    function Rook (color, row, col) {
    Piece.call(this, color, row, col);
    this.type = "rook";
    }
    
    Rook.prototype = Object.create(Piece.prototype);
    Rook.prototype.constructor = Rook;
    
    Rook.prototype.getMoves = function(board) {
    var moves = [];
    var directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (var i = 0; i < directions.length; i++) {
    var direction = directions[i];
    for (var j = 1; j <= 7; j++) {
    var newRow = this.row + j * direction[0];
    var newCol = this.col + j * direction[1];
    if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) {
    break;
    }
    if (board[newRow][newCol] === null) {
    moves.push([newRow, newCol]);
    } else {
    if (board[newRow][newCol].color !== this.color) {
    moves.push([newRow, newCol]);
    }
    break;
    }
    }
    }
    return moves;
    }
    
    function Knight(color, row, col) {
    Piece.call(this, color, row, col);
    this.type = "knight";
    }
    
    Knight.prototype = Object.create(Piece.prototype);
    Knight.prototype.constructor = Knight;
    
    Knight.prototype.getMoves = function(board) {
    var moves = [];
    var directions = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
    for (var i = 0; i < directions.length; i++) {
    var direction = directions[i];
    var newRow = this.row + direction[0];
    var newCol = this.col + direction[1];
    if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) {
    continue;
    }
    if (board[newRow][newCol] === null || board[newRow][newCol].color !== this.color) {
    moves.push([newRow, newCol]);
    }
    }
    return moves;
    }
    
    function Bishop(color, row, col) {
    Piece.call(this, color, row, col);
    this.type = "bishop";
    }
    
    Bishop.prototype = Object.create(Piece.prototype);
    Bishop.prototype.constructor = Bishop;
    
    Bishop.prototype.getMoves = function(board) {
    var moves = [];
    var directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    for (var i = 0; i < directions.length; i++) {
    var direction = directions[i];
    for (var j = 1; j <= 7; j++) {
    var newRow = this.row + j * direction[0];
    var newCol = this.col + j * direction[1];
    if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) {
    break;
    }
    if (board[newRow][newCol] === null) {
    moves.push([newRow, newCol]);
    } else {
    if (board[newRow][newCol].color !== this.color) {
    moves.push([newRow, newCol]);
    }
    break;
    }
    }
    }
    return moves;
    }
    function King(color, row, col) {
      Piece.call(this, color, row, col);
      this.type = "king";
    }
    
    King.prototype = Object.create(Piece.prototype);
    King.prototype.constructor = King;
    
    King.prototype.getMoves = function(board) {
      var moves = [];
      var directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
      ];
      for (var i = 0; i < directions.length; i++) {
        var direction = directions[i];
        var newRow = this.row + direction[0];
        var newCol = this.col + direction[1];
        if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) {
          continue;
        }
        if (board[newRow][newCol] === null || board[newRow][newCol].color !== this.color) {
          moves.push([newRow, newCol]);
        }
      }
      return moves;
    }
    
    function Queen(color, row, col) {
      Piece.call(this, color, row, col);
      this.type = "queen";
    }
    
    Queen.prototype = Object.create(Piece.prototype);
    Queen.prototype.constructor = Queen;
    
    Queen.prototype.getMoves = function(board) {
      var moves = [];
      var directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
      ];
      for (var i = 0; i < directions.length; i++) {
        var direction = directions[i];
        for (var j = 1; j <= 7; j++) {
          var newRow = this.row + j * direction[0];
          var newCol = this.col + j * direction[1];
          if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) {
            break;
          }
          if (board[newRow][newCol] === null) {
            moves.push([newRow, newCol]);
          } else {
            if (board[newRow][newCol].color !== this.color) {
              moves.push([newRow, newCol]);
            }
            break;
          }
        }
      }
      return moves;
    }
    
    
    
     