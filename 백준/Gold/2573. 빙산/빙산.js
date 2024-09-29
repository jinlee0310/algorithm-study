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

  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];
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
        graph[ny][nx] !== 0 &&
        !visited[ny][nx]
      ) {
        visited[ny][nx] = true;
        queue.push([nx, ny]);
      }
    }
  }
};

const isMelted = (graph) => {
  for (let j = 0; j < graph.length; j++) {
    for (let i = 0; i < graph[0].length; i++) {
      if (graph[j][i] !== 0) return false;
    }
  }
  return true;
};

const melting = (graph) => {
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  const candidates = [];

  for (let j = 0; j < graph.length; j++) {
    for (let i = 0; i < graph[0].length; i++) {
      let cnt = 0;
      if (graph[j][i] !== 0) {
        for (let k = 0; k < 4; k++) {
          const nx = i + dx[k];
          const ny = j + dy[k];
          if (
            0 <= nx &&
            nx < graph[0].length &&
            0 <= ny &&
            ny < graph.length &&
            graph[ny][nx] === 0
          ) {
            cnt++;
          }
        }
      }
      if (cnt > 0) candidates.push([i, j, cnt]);
    }
  }
  candidates.forEach(([x, y, cnt]) => {
    graph[y][x] = graph[y][x] <= cnt ? 0 : graph[y][x] - cnt;
  });
};

const solution = (input) => {
  const [n, m] = input[0].split(" ").map((v) => Number(v));
  const graph = [];
  for (let i = 1; i <= n; i++) {
    graph.push(input[i].split(" ").map((v) => Number(v)));
  }
  let year = 0;
  while (!isMelted(graph)) {
    const visited = Array.from({ length: n }, () => Array(m).fill(false));
    let cnt = 0;
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < m; i++) {
        if (graph[j][i] !== 0 && !visited[j][i]) {
          cnt++;
          bfs(graph, visited, [i, j]);
        }
      }
    }
    if (cnt >= 2) {
      console.log(year);
      return;
    } else {
      melting(graph);
    }
    year++;
  }
  console.log(0);
};

solution(input);
