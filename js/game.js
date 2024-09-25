"use strict";

//Global Variables
var gBoard;
var gLevel = { SIZE: 4, MINES: 2 };
var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  lives: 3,
  secsPassed: 0,
};

const MINE = "MINE";

const MINE_IMG = '<img src="img/bomb.png">';
const BROKENLIFE_IMG = '<img src="img/broken-life.png">';
const LIFE_IMG = '<img src="img/life.png">';
const FLAG_IMG = '<img src="img/flag.png">';

function onInit() {
  gBoard = buildBoard(4);
  console.table(gBoard);
  renderBoard(gBoard);
  hideContextMenu();
  gGame.isOn = true;
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
  setInitLives(3);

  //update minesAroundCount for each cell
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].minesAroundCount = setMinesNegsCount(board, i, j);
      // console.log(`i: ${i}, j: ${j}`, board[i][j]);
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
      strHTML += `<td class="cell ${className}" onclick="onCellClicked(this,${i},${j})" oncontextmenu="onCellMarked(this,${i},${j})">`;

      strHTML += "</td>";
    }
    strHTML += "</tr>";
  }
  const elContainer = document.querySelector(".board");
  elContainer.innerHTML = strHTML;
}

function createMines(board) {
  //create array of all cells
  var cellsNum = board.length * board[0].length;
  console.log(cellsNum);
  var cellsArray = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let currCell = { i: i, j: j };
      cellsArray.push(currCell);
    }
  }
  //get random index + set mine on the board
  for (let x = 0; x < gLevel.MINES; x++) {
    let idx = getRandomInt(0, cellsArray.length);
    let newMine = cellsArray[idx]; //{2,3}
    console.log(newMine);
    board[newMine.i][newMine.j].isMine = true;
  }
}

function setMinesNegsCount(mat, rowIdx, colIdx) {
  var minesCounter = "";

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

function renderCell(i, j, value) {
  const cellSelector = `.cell-${i}-${j}`; //.cell-2-9
  const elCell = document.querySelector(cellSelector);
  elCell.innerHTML = value;
}

function onCellClicked(elCell, i, j) {
  if (!gGame.isOn) {
    console.log("game is over, please restart");
    return;
  }

  console.log(`you clicked on i: ${i}, j: ${j}`);
  let currCell = gBoard[i][j];

  if (currCell.isShown || currCell.isMarked) return;

  if (currCell.isMine) {
    console.log("UH OH...");
    liveReduce();
    //update the MODEL
    currCell.isShown = true;
    gLevel.MINES--;

    //update the DOM
    renderCell(i, j, MINE_IMG);
    elCell.classList.add("bombed");
  }

  if (!currCell.isMine) {
    //update the MODEL
    currCell.isShown = true;
    gGame.shownCount++;

    //update the DOM
    var negsNum = setMinesNegsCount(gBoard, i, j);
    elCell.innerText = negsNum;
    elCell.classList.add("shown");
  }
  checkGameOver();
  console.log(`lives left: ${gGame.lives}`);
}

function setInitLives(num) {
  for (var i = 0; i < num; i++) {
    let elSpan = document.querySelector(`.life${i + 1}`);
    elSpan.innerHTML = `<img class="lives" src="img/life.png" alt="lives" />`;
  }
}

function liveReduce() {
  //MODEL
  gGame.lives--;
  //DOM
  let elSpan = document.querySelector(`.life${gGame.lives + 1}`);
  elSpan.innerHTML = `<img class="lives" src="img/broken-life.png" alt="lives" />`;
}

function onCellMarked(elCell, i, j) {
  if ((gGame.lives = 0)) return;

  if (gBoard[i][j].isMine && gBoard[i][j].isShown) return;

  if (!gBoard[i][j].isMarked) {
    gBoard[i][j].isMarked = true;
    gGame.markedCount++;
    renderCell(i, j, FLAG_IMG);
  } else if (gBoard[i][j].isMarked) {
    gBoard[i][j].isMarked = false;
    gGame.markedCount--;
    renderCell(i, j, "");
  }
  checkGameOver();
}

function hideContextMenu() {
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
}

function checkGameOver() {
  let isOver = true;

  if (gGame.lives === 0) {
    console.log("Game Over: No lives left.");
    gGame.isOn = false;
    return true;
  }

  for (let i = 0; i < gBoard.length; i++) {
    for (let j = 0; j < gBoard[i].length; j++) {
      const cell = gBoard[i][j];
      if (!cell.isMines && !cell.isShown) {
        isOver = false;
      }
      if (cell.isMine && !cell.isMarked && !cell.isShown) {
        isOver = false;
      }
    }
  }
  if (isOver && gGame.lives > 0) {
    console.log("Game Over: You won!");
    gGame.isOn = false;
    return true;
  }
  return false;
}

function renderNewBoard(size) {
  var gBoard = buildBoard(size);
  renderBoard(gBoard);
}

function onSetDifficulty(size, mines) {
  gLevel.SIZE = size;
  gLevel.MINES = mines;
  gGame.isOn = true;
  gGame.shownCount = 0;
  gGame.markedCount = 0;
  gGame.lives = 3;
  gBoard = buildBoard(size);
  renderBoard(gBoard);
  setInitLives(3);
  console.log(`New board created: ${size}x${size}, Mines: ${mines}`);
}
