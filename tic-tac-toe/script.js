const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newBtn = document.querySelector(".btn");
let currplayer;
let gameGrid;
const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
initGame();
// Initialize game
function initGame() {
  currplayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.classList = `box box${index + 1}`;
    box.classList.remove("win"); // Remove 'win' class if present
  });
  newBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currplayer}`;
}

function swapTurn() {
  currplayer = currplayer === "X" ? "O" : "X";
  gameInfo.innerText = `Current Player - ${currplayer}`;
}

function checkGameOver() {
  let winner = "";
  winningPosition.forEach((position) => {
    const [a, b, c] = position;
    if (
      gameGrid[a] !== "" &&
      gameGrid[a] === gameGrid[b] &&
      gameGrid[a] === gameGrid[c]
    ) {
      winner = gameGrid[a];
      boxes[a].classList.add("win");
      boxes[b].classList.add("win");
      boxes[c].classList.add("win");
    }
  });

  if (winner !== "") {
    gameInfo.innerText = `Winner Player - ${winner}`;
    disableBoxes();
    newBtn.classList.add("active");
    return;
  }

  let fillCount = gameGrid.filter((value) => value !== "").length;
  if (fillCount >= 9) {
    gameInfo.innerText = "Game Tied!";
    newBtn.classList.add("active");
    return;
  }
}

function disableBoxes() {
  boxes.forEach((box) => {
    box.style.pointerEvents = "none";
  });
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currplayer;
    gameGrid[index] = currplayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newBtn.addEventListener("click", initGame);
