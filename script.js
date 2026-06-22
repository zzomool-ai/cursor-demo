/** 게임 보드 가로 칸 수 */
const COLS = 10;

/** 게임 보드 세로 칸 수 */
const ROWS = 20;

/** DOM 요소 참조 */
const boardElement = document.getElementById('board');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');

/** 현재 점수 (골격 단계에서는 0으로 유지) */
let score = 0;

/**
 * 빈 보드(2차원 배열)를 만든다.
 * @returns {number[][]} 0으로 채워진 보드
 */
function createEmptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

/**
 * 보드 데이터를 화면에 그린다.
 * @param {number[][]} board - 렌더링할 보드 데이터
 */
function renderBoard(board) {
  boardElement.innerHTML = '';

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = String(row);
      cell.dataset.col = String(col);

      if (board[row][col] !== 0) {
        cell.classList.add('filled');
      }

      boardElement.appendChild(cell);
    }
  }
}

/**
 * 점수 표시를 갱신한다.
 */
function updateScoreDisplay() {
  scoreElement.textContent = String(score);
}

/**
 * 게임을 초기화하고 빈 보드를 표시한다.
 */
function initGame() {
  score = 0;
  updateScoreDisplay();
  renderBoard(createEmptyBoard());
}

startButton.addEventListener('click', initGame);
restartButton.addEventListener('click', initGame);

initGame();
