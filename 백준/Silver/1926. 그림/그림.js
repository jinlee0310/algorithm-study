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

const bfs = (graph, visited, start) => {
  const queue = [start];
  visited[start[1]][start[0]] = true;

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  let size = 1;

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        0 <= nx &&
        nx < graph[0].length &&
        0 <= ny &&
        ny < graph.length &&
        graph[ny][nx] === 1 &&
        !visited[ny][nx]
      ) {
        visited[ny][nx] = true;
        size += 1;
        queue.push([nx, ny]);
      }
    }
  }
  // console.log(visited);
  // console.log(size);
  return size;
};

const solution = (input) => {
  // n세로 m가로
  const [n, m] = input[0].split(" ").map((v) => Number(v));
  const graph = [];
  for (let i = 1; i <= n; i++) {
    graph.push(input[i].split(" ").map((v) => Number(v)));
  }
  const visited = Array.from({ length: n }, () => Array(m).fill(false));

  let cnt = 0;
  let max = 0;
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < m; i++) {
      if (graph[j][i] === 1 && !visited[j][i]) {
        cnt++;
        max = Math.max(max, bfs(graph, visited, [i, j]));
      }
    }
  }
  console.log(cnt);
  console.log(max);
};

solution(input);
