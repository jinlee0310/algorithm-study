const solution = (board) => {
  const N = board.length;

  const moves = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  const coords = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (board[r][c] === 1) {
        coords.push([r, c]);
      }
    }
  }
  coords.forEach(([r, c]) => {
    for (let [dr, dc] of moves) {
      const nr = r + dr;
      const nc = c + dc;
      if (0 <= nr && nr < N && 0 <= nc && nc < N) {
        board[nr][nc] = 1;
      }
    }
  });
  let cnt = 0;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if(board[r][c]===0) cnt++;
    }
  }
  console.log(cnt);
    return cnt
};
