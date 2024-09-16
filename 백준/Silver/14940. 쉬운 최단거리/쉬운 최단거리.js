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

const bfs = (graph, start) => {
  const queue = [start];
  const visited = Array.from({ length: graph.length }, () =>
    new Array(graph[0].length).fill(0),
  );

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
        visited[ny][nx] === 0 &&
        graph[ny][nx] === 1
      ) {
        visited[ny][nx] = visited[y][x] + 1;
        queue.push([nx, ny]);
      }
    }
  }
  for (let j = 0; j < graph.length; j++) {
    for (let i = 0; i < graph[0].length; i++) {
      if (graph[j][i] === 1 && visited[j][i] === 0) {
        visited[j][i] = -1;
      }
    }
  }
  return visited;
};

const solution = (input) => {
  const [n, m] = input[0].split(" ").map((v) => Number(v));
  const graph = [];
  for (let i = 1; i <= n; i++) {
    graph.push(input[i].split(" ").map((v) => Number(v)));
  }
  let answer;
  for (let j = 0; j < graph.length; j++) {
    for (let i = 0; i < graph[0].length; i++) {
      if (graph[j][i] === 2) {
        answer = bfs(graph, [i, j]);
      }
    }
  }

  for (let i = 0; i < answer.length; i++) {
    console.log(answer[i].join(" "));
  }
};

solution(input);
