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
    const rest = [...arr.slice(idx + 1)];
    const combinations = combination(rest, n - 1);
    const attach = combinations.map((combination) => [v, ...combination]);
    answer.push(...attach);
  });
  return answer;
};

const bfs = (graph, start) => {
  const queue = [start];

  const delta = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  while (queue.length) {
    let [x, y, dir] = queue.shift();
    graph[y][x] = 2;

    let cnt = 0;
    for (let i = 0; i < 4; i++) {
      const nx = x + delta[i][0];
      const ny = y + delta[i][1];
      if (graph[ny][nx] !== 0) cnt += 1;
    }

    if (cnt === 4) {
      const nx = x - delta[dir][0];
      const ny = y - delta[dir][1];

      if (graph[ny][nx] === 0 || graph[ny][nx] === 2) {
        queue.push([nx, ny, dir]);
      } else if (graph[ny][nx] === 1) {
        return;
      }
    } else {
      dir = dir === 0 ? 3 : (dir -= 1);
      const nx = x + delta[dir][0];
      const ny = y + delta[dir][1];

      if (graph[ny][nx] === 0) {
        queue.push([nx, ny, dir]);
      } else {
        queue.push([x, y, dir]);
      }
    }
  }
};

const solution = (input) => {
  const [N, M] = input[0].split(" ").map(Number);
  const [y, x, dir] = input[1].split(" ").map(Number);
  const graph = [];
  for (let i = 2; i <= N + 1; i++) {
    graph.push(input[i].split(" ").map(Number));
  }
  bfs(graph, [x, y, dir]);
  let answer = 0;

  for (let j = 0; j < N; j++) {
    for (let i = 0; i < M; i++) {
      if (graph[j][i] === 2) answer++;
    }
  }
  console.log(answer);
};

solution(input);
