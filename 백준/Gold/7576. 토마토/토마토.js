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

const bfs = (graph, coords, visited) => {
  const queue = [coords];

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  while (queue.length) {
    const coords = queue.shift();

    const newCoords = [];
    coords.forEach((coord) => {
      const [x, y] = coord;

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (
          0 <= nx &&
          nx < graph[0].length &&
          0 <= ny &&
          ny < graph.length &&
          visited[ny][nx] === 0 &&
          graph[ny][nx] === 0
        ) {
          visited[ny][nx] = visited[y][x] + 1;
          newCoords.push([nx, ny]);
        }
      }
    });
    if (newCoords.length !== 0) queue.push(newCoords);
  }
  // console.log(visited);
  let answer = 0;
  for (let j = 0; j < visited.length; j++) {
    for (let i = 0; i < visited[0].length; i++) {
      if (visited[j][i] === 0) return -1;
      answer = Math.max(answer, visited[j][i]);
    }
  }
  return answer - 1;
};

const solution = (input) => {
  const [m, n] = input[0].split(" ").map((v) => Number(v));
  const graph = [];
  for (let i = 1; i <= n; i++) {
    graph.push(input[i].split(" ").map((v) => Number(v)));
  }
  const visited = Array.from({ length: graph.length }, () =>
    new Array(graph[0].length).fill(0),
  );
  const coords = [];
  for (let j = 0; j < graph.length; j++) {
    for (let i = 0; i < graph[0].length; i++) {
      if (graph[j][i] === 1) {
        coords.push([i, j]);
        visited[j][i] = 1;
      } else if (graph[j][i] === -1) {
        visited[j][i] = -1;
      }
    }
  }
  console.log(bfs(graph, coords, visited));
};

solution(input);
