const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim()
  .split("\n");

const rotate = (board, L) => {
  const size = Math.pow(2, L);
  // r,c
  const N = board.length;

  // 특정 부분 배열을 회전시키는 함수
  const rotateMatrix = (matrix) => {
    const n = matrix.length;
    const rotated = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        rotated[j][n - 1 - i] = matrix[i][j];
      }
    }
    return rotated;
  };

  for (let j = 0; j < N; j += size) {
    for (let i = 0; i < N; i += size) {
      // 현재 부분 배열 추출
      const subMatrix = board
        .slice(j, j + size)
        .map((row) => row.slice(i, i + size));

      // 회전된 부분 배열 가져오기
      const rotatedMatrix = rotateMatrix(subMatrix);

      // 회전된 배열을 원래 보드에 반영
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          board[j + y][i + x] = rotatedMatrix[y][x];
        }
      }
    }
  }
  // console.log(board);
};

const melt = (board) => {
  const N = board.length;

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  const melting = [];
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      let cnt = 0;
      for (let k = 0; k < 4; k++) {
        const nx = i + dx[k];
        const ny = j + dy[k];

        if (0 <= nx && nx < N && 0 <= ny && ny < N && board[ny][nx] > 0) {
          cnt++;
        }
      }
      if (cnt < 3) melting.push([i, j]);
    }
  }
  melting.forEach(([i, j]) => {
    if (board[j][i] > 0) board[j][i]--;
  });
};

const countIce = (board) => {
  let sum = 0;
  const N = board.length;
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      sum += board[j][i];
    }
  }
  return sum;
};

const bfs = (board, visited, start) => {
  let size = 0;
  const N = board.length;
  visited[start[1]][start[0]] = true;
  const queue = [start];

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  while (queue.length) {
    const [x, y] = queue.shift();
    size++;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        0 <= nx &&
        nx < N &&
        0 <= ny &&
        ny < N &&
        board[ny][nx] !== 0 &&
        !visited[ny][nx]
      ) {
        visited[ny][nx] = true;
        queue.push([nx, ny]);
      }
    }
  }
  return size;
};

const findLargestIceChunk = (board) => {
  const N = board.length; // 보드 크기
  const visited = Array.from({ length: N }, () => Array(N).fill(false)); // 방문 여부 체크

  let largestChunk = 0;

  // 전체 배열 순회
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      if (board[j][i] > 0 && !visited[j][i]) {
        // 얼음이 있는 칸에서 BFS 시작
        const size = bfs(board, visited, [i, j]);
        largestChunk = Math.max(largestChunk, size); // 최대값 갱신
      }
    }
  }

  return largestChunk;
};

const firestorm = (board, operations) => {
  for (const operation of operations) {
    rotate(board, operation);
    melt(board);
  }
  console.log(countIce(board));
  console.log(findLargestIceChunk(board));
};

const solution = (input) => {
  const [N, Q] = input[0].split(" ").map(Number);
  const board = [];
  for (let i = 1; i <= Math.pow(2, N); i++) {
    board.push(input[i].split(" ").map(Number));
  }
  const operations = input.slice(-1)[0].split(" ").map(Number);
  firestorm(board, operations);
};

solution(input);
