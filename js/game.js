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

  //update minesAroundCount
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].minesAroundCount = setMinesNegsCount(board, i, j);
      console.log(`i: ${i}, j: ${j}`, board[i][j]);
    }
  }
  return board;
}

function renderBoard(board) {
  var strHTML = "";
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j];
      var className = `cell-${i}-${j} floor`;
      // var elCell = document.querySelector(`.${className}`);
      strHTML += `<td class="cell ${className}" onclick="onCellClicked(this,${i},${j})">`;

      if (cell.isMine) strHTML += MINE_IMG;

      strHTML += "</td>";
    }
    strHTML += "</tr>";
  }
  const elContainer = document.querySelector(".board");
  elContainer.innerHTML = strHTML;
}

function createMines(board) {
  board[0][0].isMine = true;
  board[2][3].isMine = true;
}

function setMinesNegsCount(mat, rowIdx, colIdx) {
  var minesCounter = 0;

  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= mat.length) continue;

    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue;
      if (i === rowIdx && j === colIdx) continue;

      if (mat[i][j].isMine) {
        minesCounter++;
      }
    }
  }
  mat[rowIdx][colIdx].minesAroundCount = minesCounter;
  return minesCounter;
}

function onCellClicked(elCell, i, j) {
  console.log(`you clicked on i: ${i}, j: ${j}`);
  let currCell = gBoard[i][j];

  if (currCell.isShown) return;

  if (currCell.isMine) {
    console.log("UH OH...");
    //update the MODEL
    currCell.isShown = true;
    gLevel.MINES--;

    //update the DOM
    //renderCell();
  }

  if (!currCell.isMine) {
    //update the MODEL
    currCell.isShown = true;

    //update the DOM
    var negsNum = setMinesNegsCount(gBoard, i, j);
    elCell.innerText = negsNum;
    elCell.classList.add("shown");
  }
  console.log(`the current cell: ${gBoard[i][j]}`);
}
