"use strict";
/*

function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function createMat(ROWS, COLS) {
  var mat = [];
  for (var i = 0; i < ROWS; i++) {
    var row = [];
    for (var j = 0; j < COLS; j++) {
      row.push("");
    }
    mat.push(row);
  }
  return mat;
}

function copyMat(mat) {
  var newMat = [];
  for (vari = 0; i < mat.length; i++) {
    newMat[i] = [];
    for (var j = 0; j < mat.length; j++) {
      newMat[i][j] = mat[i][j];
    }
  }
  return newMat;
}

function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = "cell cell" + i + "-" + j;
      strHTML += '<td class="' + className + '"> ' + cell + " </td>";
    }
    strHTML += "</tr>";
  }
  strHTML += "</tbody></table>";
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function printPrimaryDiagonal(squareMat) {
  for (var d = 0; d < squareMat.length; d++) {
    var item = squareMat[d][d];
    console.log(item);
  }
}

function printSecondaryDiagonal(squareMat) {
  for (var d = 0; d < squareMat.length; d++) {
    var item = squareMat[d][squareMat.length - 1 - d];
    console.log(item);
  }
}

function countNegs(cellIdx, cellIdy, mat) {
  var negsCount = 0;
  for (var i = cellIdx - 1; i <= cellIdx + 1; i++) {
    if (i < 0 || i > mat.length - 1) continue;
    for (var j = cellIdy - 1; j <= cellIdy + 1; j++) {
      if (j < 0 || j > mat[i].length - 1) continue;
      if (i === cellIdx && j === cellIdy) continue;

      if (mat[i][j]) negsCount++; // might need a change
    }
  }
  return negsCount;
}

function updateScore(diff) {
  gGame.score += diff;
  document.querySelector("h2 span").innerText = gGame.score;
}

function toggleGame(elBtn) {
  if (gGameInterval) {
    clearInterval(gGameInterval);
    gGameInterval = null;
    elBtn.innerText = "Play";
  } else {
    gGameInterval = setInterval(play, GAME_FREQ);
    elBtn.innerText = "Pause";
  }
}

function getEmptyCell() {
  var emptyCells = [];

  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      var currCell = gBoard[i][j];
      if (!currCell.gameElement && currCell.type === FLOOR) {
        var emptyCellPos = { i, j };
        emptyCells.push(emptyCellPos);
      }
    }
  }
  var randomIdx = getRandomInt(0, emptyCells.length);
  var emptyCell = emptyCells[randomIdx];
  return emptyCell;
}

function getMoveDiff() {
  // return random movement direction
  var randNum = getRandomIntInt(0, 100);
  if (randNum < 25) {
    return { i: 0, j: 1 };
  } else if (randNum < 50) {
    return { i: -1, j: 0 };
  } else if (randNum < 75) {
    return { i: 0, j: -1 };
  } else {
    return { i: 1, j: 0 };
  }
}

function getNextLocation(eventKeyboard) {
  // next Pacman location

  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };

  // TODO: figure out nextLocation
  switch (eventKeyboard.key) {
    case "ArrowUp":
      nextLocation.i--;
      break;
    case "ArrowDown":
      nextLocation.i++;
      break;
    case "ArrowRight":
      nextLocation.j++;
      break;
    case "ArrowLeft":
      nextLocation.j--;
      break;
    default:
      return null;
  }

  return nextLocation;
}

function cleanBoard() {
  var elTds = document.querySelectorAll(".mark,.selected");
  for (var i = 0; i < elTds.length; i++) {
    elTds[i].classList.remove("mark", "selected");
  }
}

function addElement(element, elementImg) {
  var emptyCell = getEmptyCell();
  // Model:
  gBoard[emptyCell.i][emptyCell.j].gameElement = element;
  // DOM :
  renderCell(emptyCell, elementImg);
  return emptyCell;
}

function getSelector(coord) {
  return "#cell-" + coord.i + "-" + coord.j;
}

//queryselector subtrees:
var elP = document.querySelector(".box p");
elP.innerText = "Hello!";

//Class add & remove:
var elBox = document.querySelector(".var");
elMsg = document.querySelector(".msg");
if (elBox.classList.contains(" selected")) {
  elMsg.classList.add("success");
  elBox.classList.remove("selected");
}
// end of classlist

function isEmptyCell(coord) {
  return gBoard[coord.i][coord.j] === "";
}

function getNextLocation(eventKeyboard) {
  var nextLocation = {
    i: location.i,
    j: location.j,
  };

  switch (eventKeyboard.code) {
    case "ArrowUp":
      nextLocation.i--;
      break;
    case "ArrowDown":
      nextLocation.i++;
      break;
    case "ArrowLeft":
      nextLocation.j--;
      break;
    case "ArrowRight":
      nextLocation.j++;
      break;
    default:
      return null;
  }
  return nextLocation;
}

function getRandomIntInc(min, max) {
  // Maximum is inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is inclusive and the minimum is inclusive
}

function getRandomInt(min, max) {
  // Maximum is NOT inclusive
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function playSound(file) {
  var audio = new Audio(file);
  audio.play();
}

function drawNum() {
  var idx = getRandomInt(0, gNums.length);
  var num = gNums[idx];
  gNums.splice(idx, 1);
  return num;
}

function shuffle(items) {
  var randIdx, keep;
  for (var i = items.length - 1; i > 0; i--) {
    // randIdx = getRandomInt(0, items.length);
    randIdx = getRandomInt(0, i + 1);

    keep = items[i];
    items[i] = items[randIdx];
    items[randIdx] = keep;
  }
  return items;
}

gScrollTimeout = setTimeout(function1, 500);

setTimeout(function () {
  gPacman.isSuper = false;
  ghostsBackToLife();
  changeGhostsColor(gPacman.isSuper);
}, 5000);

// Timer
gGameInterval = setInterval(startTimer, 100);
function startTimer() {
  var timer = document.querySelector(".time");
  milisec++;
  if (milisec > 9) {
    sec++;
    milisec = 0;
  }
  if (sec > 59) {
    min++;
    sec = 0;
  }
  timer.innerText =
    (min < 10 ? "0" + min : min) +
    ":" +
    (sec < 10 ? "0" + sec : sec) +
    ":" +
    "0" +
    milisec;
}

function handleKey(event) {
  // Move the player by keyboard arrows
  console.log("event:", event);

  var i = gGamerPos.i;
  var j = gGamerPos.j;

  switch (event.key) {
    case "ArrowLeft":
      moveTo(i, j - 1);
      break;
    case "ArrowRight":
      moveTo(i, j + 1);
      break;
    case "ArrowUp":
      moveTo(i - 1, j);
      break;
    case "ArrowDown":
      moveTo(i + 1, j);
      break;
  }
}

/* Modal HTML:
<div class="modal">
    <button onclick="closeModal()">x</button>
    <h2>Easy (Kal)</h2>
</div>
*/

/* Modal CSS:
.modal {
    background - color: lightseagreen;
    display: none;
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px;
    width: 300px;
}
.modal button {
    float: right;
}
*/

/*
// Modal JS:
function openModal() {
  clearTimeout(gModalTimeoutId);
  // Todo: show the modal and schedule its closing
  var elModal = document.querySelector(".modal");
  elModal.style.display = "block";
  gModalTimeoutId = setTimeout(closeModal, 5000);
  // gModalTimeoutId = setTimeout(function () {
  //   closeModal()
  // }, 5000);
}

function closeModal() {
  // Todo: hide the modal
  clearTimeout(gModalTimeoutId);
  var elModal = document.querySelector(".modal");
  elModal.style.display = "none";
}

function startStop(elBtnStart) {
  /* Toggle StartStop */
/*
  if (gCurrQuestIdx === gQuests.length || gCurrQuestIdx === 0) {
    GstartStop = !GstartStop;

    if (GstartStop) {
      start();
      GstartStop = !GstartStop;
    } else {
      GstartStop = !GstartStop;
      gCurrQuestIdx = 0;
      reset();
      start();
    }
    elBtnStart.innerHTML = "Good luck!";
  }
}

function start() {
  x = setInterval(timer, 10);
  renderQuests();
  gCurrQuestIdx++;
} /* Start */
/*
function stop() {
  clearInterval(x);
  GstartStop = !GstartStop;
} /* Stop */
/*
var milisec = 0;
var sec = 0; /* holds incrementing value */
/*
var min = 0;
var hour = 0;

/* Contains and outputs returned value of  function checkTime */
/*
var miliSecOut = 0;
var secOut = 0;
var minOut = 0;
var hourOut = 0;

/* Output variable End */
/*
function timer() {
  /* Main Timer */
/*
  miliSecOut = checkTime(milisec);
  secOut = checkTime(sec);
  minOut = checkTime(min);
  hourOut = checkTime(hour);

  milisec = ++milisec;

  if (milisec === 100) {
    milisec = 0;
    sec = ++sec;
  }

  if (sec == 60) {
    min = ++min;
    sec = 0;
  }

  if (min == 60) {
    min = 0;
    hour = ++hour;
  }

  document.getElementById("milisec").innerHTML = miliSecOut;
  document.getElementById("sec").innerHTML = secOut;
  document.getElementById("min").innerHTML = minOut;
  document.getElementById("hour").innerHTML = hourOut;
}
/* Adds 0 when value is <10 */
/*
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function reset() {
  GstartStop = false;
  gCurrQuestIdx = 0;

  /Reset/;

  milisec = 0;
  sec = 0;
  min = 0;
  hour = 0;

  document.getElementById("milisec").innerHTML = "00";
  document.getElementById("sec").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";
  document.getElementById("hour").innerHTML = "00";

  renderQuests();
}


<body onload="init()">
  <div class="sky">
    <div class="header">
      <h1>Which Color is it?</h1>
      <button onclick="startStop(this)" class="elBtnStart">
        start{" "}
      </button>
    </div>
    <div class="timer">
      <span id="hour">00</span> :<span id="min">00</span> :
      <span id="sec">00</span> :<span id="milisec">00</span>{" "}
    </div>
    <div class="quest-container"></div>
  </div>
  <script src="js/main.js "></script>
</body>;
*/
