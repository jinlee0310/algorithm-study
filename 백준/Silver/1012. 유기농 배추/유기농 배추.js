const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .split("\n");

const drawGraph = (conditions, coordinates) => {
  const [m, n, cnt] = conditions;
  const graph = Array.from({ length: n }, () => new Array(m).fill(0));
  for (let i = 0; i < cnt; i++) {
    const [x, y] = coordinates[i];
    graph[y][x] = 1;
  }
  return graph;
};

const bfs = (graph, start, visited) => {
  const queue = [start];

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

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
        visited[ny][nx] === 0
      ) {
        visited[ny][nx] = 1;
        queue.push([nx, ny]);
      }
    }
  }
};

const solution = (input) => {
  for (let i = 1; i < input.length; i++) {
    const el = input[i].split(" ");
    if (el.length === 3) {
      const [m, n, cnt] = el.map((v) => Number(v));
      const coordinates = input
        .slice(i + 1, i + 1 + cnt)
        .map((v) => v.split(" ").map((v) => Number(v)));
      const graph = drawGraph([m, n, cnt], coordinates);
      const visited = Array.from({ length: n }, () => new Array(m).fill(0));
      let answer = 0;
      for (let i = 0; i < coordinates.length; i++) {
        const [x, y] = coordinates[i];
        if (!visited[y][x]) {
          bfs(graph, [x, y], visited);
          answer++;
        }
      }
      console.log(answer);
    }
  }
};

solution(input);
