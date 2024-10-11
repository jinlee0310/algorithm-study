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

const diffuse = (graph) => {
  const dust = [];
  for (let j = 0; j < graph.length; j++) {
    for (let i = 0; i < graph[0].length; i++) {
      if (graph[j][i] > 0) {
        dust.push([i, j, graph[j][i]]);
      }
    }
  }
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  dust.forEach(([x, y, d]) => {
    let cnt = 0;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (0 <= nx && nx < graph[0].length && 0 <= ny && ny < graph.length) {
        if (graph[ny][nx] !== -1) {
          cnt++;
          graph[ny][nx] = graph[ny][nx] + Math.floor(d / 5);
        }
      }
    }
    graph[y][x] = d - Math.floor(d / 5) * cnt + (graph[y][x] - d);
  });
};

const excuse = (graph, airCondition) => {
  const up = airCondition[0];
  const down = airCondition[1];

  const C = graph[0].length - 1;
  const R = graph.length - 1;

  // 위쪽 공기청정기
  for (let i = up - 1; i > 0; i--) graph[i][0] = graph[i - 1][0];
  for (let j = 0; j < C; j++) graph[0][j] = graph[0][j + 1];
  for (let i = 0; i < up; i++) graph[i][C] = graph[i + 1][C];
  for (let j = C; j > 1; j--) graph[up][j] = graph[up][j - 1];
  graph[up][1] = 0;

  // 아래쪽 공기청정기
  for (let i = down + 1; i < R; i++) graph[i][0] = graph[i + 1][0];
  for (let j = 0; j < C; j++) graph[R][j] = graph[R][j + 1];
  for (let i = R; i > down; i--) graph[i][C] = graph[i - 1][C];
  for (let j = C; j > 1; j--) graph[down][j] = graph[down][j - 1];
  graph[down][1] = 0;
};

const solution = (input) => {
  const [R, C, T] = input[0].split(" ").map(Number);
  const graph = [];
  for (let i = 1; i <= R; i++) {
    graph.push(input[i].split(" ").map(Number));
  }
  const airCondition = [];
  for (let j = 0; j < R; j++) {
    if (graph[j][0] === -1) {
      airCondition.push(j);
    }
  }
  for (let i = 0; i < T; i++) {
    diffuse(graph);
    excuse(graph, airCondition);
  }

  let answer = 0;
  for (let i = 0; i < graph[0].length; i++) {
    for (let j = 0; j < graph.length; j++) {
      if (graph[j][i] > 0) {
        answer += graph[j][i];
      }
    }
  }
  console.log(answer);
};

solution(input);
