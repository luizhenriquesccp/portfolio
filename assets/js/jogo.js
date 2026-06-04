const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let board = Array.from({ length: 3 }, () => Array(3).fill(''));
let currentPlayer = 'X';
let gameOver = false;

function createBoard() {
  boardElement.innerHTML = '';

  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.textContent = board[row][col];
      cell.addEventListener('click', handleCellClick);
      boardElement.appendChild(cell);
    }
  }

  updateStatus();
}

function handleCellClick(event) {
  if (gameOver) {
    return;
  }

  const row = Number(event.currentTarget.dataset.row);
  const col = Number(event.currentTarget.dataset.col);

  if (board[row][col] !== '') {
    return;
  }

  board[row][col] = currentPlayer;
  event.currentTarget.textContent = currentPlayer;

  if (checkVictory(currentPlayer)) {
    statusElement.textContent = `Vitória para ${currentPlayer}!`;
    gameOver = true;
    return;
  }

  if (isBoardFull()) {
    statusElement.textContent = 'Empate!';
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

function updateStatus() {
  if (gameOver) {
    return;
  }

  statusElement.textContent = `Vez de ${currentPlayer}`;
}

function isBoardFull() {
  return board.every(row => row.every(cell => cell !== ''));
}

function checkVictory(player) {
  for (let row = 0; row < 3; row += 1) {
    if (board[row].every(cell => cell === player)) {
      return true;
    }
  }

  for (let col = 0; col < 3; col += 1) {
    if (board.every(row => row[col] === player)) {
      return true;
    }
  }

  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
    return true;
  }

  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
    return true;
  }

  return false;
}

function resetGame() {
  board = Array.from({ length: 3 }, () => Array(3).fill(''));
  currentPlayer = 'X';
  gameOver = false;
  createBoard();
}

resetButton.addEventListener('click', resetGame);
createBoard();
