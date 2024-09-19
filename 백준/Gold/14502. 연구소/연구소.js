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

const combination = (arr, n) => {
  if (n === 1) return arr.map((v) => [v]);

  const answer = [];
  arr.forEach((v, idx, arr) => {
    const rest = arr.slice(idx + 1);
    const combinations = combination(rest, n - 1);
    const attach = combinations.map((combination) => [...combination, v]);
    answer.push(...attach);
  });

  return answer;
};

const bfs = (graph) => {
  const queue = [];
  for (let j = 0; j < graph.length; j++) {
    for (let i = 0; i < graph[0].length; i++) {
      if (graph[j][i] === 2) {
        queue.push([i, j]);
      }
    }
  }

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
        graph[ny][nx] === 0
      ) {
        graph[ny][nx] = 2;
        queue.push([nx, ny]);
      }
    }
  }
  let cnt = 0;
  for (let j = 0; j < graph.length; j++) {
    for (let i = 0; i < graph[0].length; i++) {
      if (graph[j][i] === 0) cnt++;
    }
  }
  return cnt;
};

const solution = (input) => {
  // 1. 벽을 세울 수 있는 위치 brute force
  // 2. 벽 세우고 바이러스 시작
  // 3. 남은 0의 개수 count
  // 세로: n, 가로: m
  const [n, m] = input[0].split(" ").map((v) => Number(v));
  const graph = [];
  for (let i = 1; i <= n; i++) {
    graph.push(input[i].split(" ").map((v) => Number(v)));
  }
  const candidate = [];
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < m; i++) {
      if (graph[j][i] === 0) {
        candidate.push([i, j]);
      }
    }
  }
  const combinations = combination(candidate, 3);
  let safe = 0;
  combinations.forEach((walls) => {
    const newGraph = [];
    for (let i = 0; i < graph.length; i++) {
      const newRow = [...graph[i]];
      newGraph.push(newRow);
    }
    walls.forEach((wall) => {
      const [x, y] = wall;
      newGraph[y][x] = 1;
    });
    safe = Math.max(safe, bfs(newGraph));
  });
  console.log(safe);
};

solution(input);
