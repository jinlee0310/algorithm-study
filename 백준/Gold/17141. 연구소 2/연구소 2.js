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

const bfs = (graph, starts) => {
  const N = graph.length;
  const visited = Array.from({ length: N }, () => Array(N).fill(0));
  starts.forEach(([x, y]) => (visited[y][x] = 1));
  const queue = [...starts];

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        0 <= nx &&
        nx < N &&
        0 <= ny &&
        ny < N &&
        graph[ny][nx] !== 1 &&
        visited[ny][nx] === 0
      ) {
        visited[ny][nx] = visited[y][x] + 1;
        queue.push([nx, ny]);
      }
    }
  }
  let max = 0;
  // console.log(visited);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[j][i] === 0 && graph[j][i] !== 1) return -1;
      else max = Math.max(max, visited[j][i] - 1);
    }
  }
  return max;
};

const combination = (arr, n) => {
  if (n === 1) return arr.map((v) => [v]);

  const result = [];
  arr.forEach((v, idx, arr) => {
    const rest = arr.slice(idx + 1);
    const combinations = combination(rest, n - 1);
    const attach = combinations.map((combination) => [v, ...combination]);
    result.push(...attach);
  });
  return result;
};

const solution = (input) => {
  const [N, M] = input[0].split(" ").map(Number);
  const graph = [];
  for (let i = 1; i <= N; i++) {
    graph.push(input[i].split(" ").map(Number));
  }
  const candidates = [];
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      if (graph[j][i] === 2) {
        candidates.push([i, j]);
      }
    }
  }
  const virusCoords = combination(candidates, M);
  let answer = Infinity;
  virusCoords.forEach((virus) => {
    // console.log(virus);
    const sec = bfs(graph, virus);
    if (sec !== -1) answer = Math.min(answer, sec);
  });
  console.log(answer === Infinity ? -1 : answer);
};

solution(input);
