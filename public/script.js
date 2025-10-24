const socket = io();
const boardEl = document.getElementById('board');
const resetBtn = document.getElementById('reset');

// ボードの描画
function renderBoard(board) {
  boardEl.innerHTML = '';
  board.forEach((cell, i) => {
    const div = document.createElement('div');
    div.className = 'cell';
    div.textContent = cell || '';
    div.onclick = () => socket.emit('move', i);
    boardEl.appendChild(div);
  });
}

socket.on('boardUpdate', renderBoard);

resetBtn.onclick = () => socket.emit('reset');
