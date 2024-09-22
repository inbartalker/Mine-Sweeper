"use strict";

//Global Variables
var gBoard;
var gLevel = { SIZE: 4, MINES: 2 };

const MINE = "MINE";
const MINE_IMG = '<img src="img/bomb.png">';

function onInit() {
  gBoard = buildBoard(4);
  console.table(gBoard);
  renderBoard(gBoard);
}

function buildBoard(size) {
  const board = [];

  for (var i = 0; i < size; i++) {
    board[i] = [];
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      };
    }
  }
  createMines(board);
  var negs = setMinesNegsCount(board, 0, 1);
  console.log(`number of negs: ${negs}`);
  return board;
}

function renderBoard(board) {
  var strHTML = "";
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j];
      var className = `cell-${i}-${j} floor`;
      strHTML += `<td class="cell ${className}" onclick="onCellClicked(elCell,${i},${j})">`;

      if (cell.isMine) strHTML += MINE_IMG;

      strHTML += "</td>";
    }
  }
  const elContainer = document.querySelector(".board");
  elContainer.innerHTML = strHTML;
}

function createMines(board) {
  board[0][0].isMine = true;
  board[2][3].isMine = true;
}

function setMinesNegsCount(mat, rowIdx, colIdx) {
  var counter = 0;

  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= mat.length) continue;

    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue;
      if (i === rowIdx && j === colIdx) continue;

      if (mat[i][j].isMine) {
        mat[i][j].minesAroundCount++;
        counter++;
        console.log(mat[i][j]);
      }
    }
  }
  return counter;
}

// function onCellClicked(elCell, i, j) {
//   if
// }
