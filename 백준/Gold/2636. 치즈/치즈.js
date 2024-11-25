const { group } = require("console");
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

const bfs = (graph) => {
  const queue = [[0, 0]];
  const H = graph.length,
    W = graph[0].length;
  const visited = Array.from({ length: H }, () => Array(W).fill(false));
  visited[0][0] = true;
  graph[0][0] = 2;

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        0 <= nx &&
        nx < W &&
        0 <= ny &&
        ny < H &&
        !visited[ny][nx] &&
        (graph[ny][nx] === 0 || graph[ny][nx] === 2)
      ) {
        visited[ny][nx] = true;
        graph[ny][nx] = 2;
        queue.push([nx, ny]);
      }
    }
  }
};

const findEdge = (graph) => {
  const coords = [];
  const W = graph[0].length,
    H = graph.length;

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  const edgeCoords = [];

  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      let cnt = 0;
      if (graph[j][i] === 1) {
        for (let k = 0; k < 4; k++) {
          const nx = i + dx[k];
          const ny = j + dy[k];

          if (0 <= nx && nx < W && 0 <= ny && ny < H && graph[ny][nx] === 2)
            cnt++;
        }
        if (cnt > 0) edgeCoords.push([i, j]);
      }
    }
  }
  return edgeCoords;
};

const findCheese = (graph) => {
  const H = graph.length,
    W = graph[0].length;
  let cnt = 0;
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      if (graph[j][i] === 1) cnt++;
    }
  }
  return cnt;
};

const solution = (input) => {
  const [H, W] = input[0].split(" ").map(Number);
  const board = [];
  for (let i = 1; i <= H; i++) {
    board.push(input[i].split(" ").map(Number));
  }
  bfs(board);

  let hour = 0;
  const cheeses = [findCheese(board)];

  while (findEdge(board).length > 0) {
    hour++;
    const edgeCoords = findEdge(board);
    edgeCoords.forEach(([x, y]) => (board[y][x] = 2));
    bfs(board);

    const cheese = findCheese(board);
    cheeses.push(cheese);
  }
  console.log(hour);
  console.log(cheeses[hour - 1]);
};

solution(input);
