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

const falling = (graph) => {
  for (let j = 0; j < graph[0].length; j++) {
    let tiles = [];
    for (let i = graph.length - 1; i >= 0; i--) {
      if (graph[i][j] !== ".") {
        tiles.push(graph[i][j]);
        graph[i][j] = ".";
      }
    }
    let i = graph.length - 1;
    tiles.forEach((tile) => {
      graph[i][j] = tile;
      i--;
    });
  }
};

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const dfs = (graph, visited, cur, tile, coords = []) => {
  visited[cur[1]][cur[0]] = true;

  for (let i = 0; i < 4; i++) {
    const nx = cur[0] + dx[i];
    const ny = cur[1] + dy[i];

    if (
      0 <= nx &&
      nx < graph[0].length &&
      0 <= ny &&
      ny < graph.length &&
      !visited[ny][nx] &&
      graph[ny][nx] === tile
    ) {
      coords.push([nx, ny]);
      dfs(graph, visited, [nx, ny], tile, coords);
    }
  }
  return coords;
};

const solution = (graph) => {
  let answer = 0;
  let cnt = 0;

  while (true) {
    falling(graph);
    for (let i = 0; i < graph[0].length; i++) {
      for (let j = 0; j < graph.length; j++) {
        if (graph[j][i] !== ".") {
          visited = Array.from({ length: graph.length }, () =>
            Array(graph[0].length).fill(false),
          );
          const coords = dfs(graph, visited, [i, j], graph[j][i]);
          coords.push([i, j]);
          if (coords.length >= 4) {
            cnt++;
            coords.forEach(([x, y]) => {
              graph[y][x] = ".";
            });
          }
        }
      }
    }
    if (cnt === 0) break;
    else {
      answer++;
      cnt = 0;
      // console.log(graph);
    }
  }
  console.log(answer);
};

solution(input.map((v) => v.split("")));
