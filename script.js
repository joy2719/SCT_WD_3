let boxes = document.querySelectorAll('.box');
let turn = "X";
let statusText = document.getElementById('status');
let resetBtn = document.getElementById('reset');
let gameOver = false;
const winGif = document.getElementById('win-gif');

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const checkWin = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      boxes[a].textContent &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[a].textContent === boxes[c].textContent
    ) {
      boxes[a].classList.add('winning-box');
      boxes[b].classList.add('winning-box');
      boxes[c].classList.add('winning-box');
      statusText.textContent = `${boxes[a].textContent} Wins!`;
      gameOver = true;
      winGif.style.display = 'block'; // 🟢 Show GIF
      return true;
    }
  }

  // Check for draw
  if (![...boxes].some(box => box.textContent === "") && !gameOver) {
    statusText.textContent = "It's a Draw!";
    gameOver = true;
    winGif.style.display = 'block'; // 🟢 Show GIF
  }
  return false;
};

// Add event listeners to boxes
boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (!box.textContent && !gameOver) {
      box.textContent = turn;
      box.classList.add(turn);
      if (!checkWin()) {
        turn = turn === "X" ? "O" : "X";
        statusText.textContent = `Turn for ${turn}`;
      }
    }
  });
});

// Reset button logic
resetBtn.addEventListener('click', () => {
  boxes.forEach(box => {
    box.textContent = '';
    box.classList.remove('X', 'O', 'winning-box');
  });
  turn = "X";
  gameOver = false;
  statusText.textContent = `Turn for ${turn}`;
  winGif.style.display = 'none'; // 🔴 Hide GIF
});
