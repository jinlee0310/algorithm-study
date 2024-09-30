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

const bfs = (graph, visited, start, letters) => {
  const queue = [start];
  visited[start[1]][start[0]] = true;

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        0 <= nx &&
        nx < graph.length &&
        0 <= ny &&
        ny < graph.length &&
        letters.includes(graph[ny][nx]) &&
        !visited[ny][nx]
      ) {
        visited[ny][nx] = true;
        queue.push([nx, ny]);
      }
    }
  }
};

const solution = (input) => {
  const n = Number(input[0]);
  const graph1 = [];
  const graph2 = [];
  for (let i = 1; i <= n; i++) {
    graph1.push(input[i].split(""));
    graph2.push(input[i].split(""));
  }

  const visited1 = Array.from({ length: n }, () => Array(n).fill(false));
  const visited2 = Array.from({ length: n }, () => Array(n).fill(false));

  let cnt1 = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (graph1[j][i] === "R" && !visited1[j][i]) {
        bfs(graph1, visited1, [i, j], ["R"]);
        cnt1++;
      } else if (graph1[j][i] === "B" && !visited1[j][i]) {
        bfs(graph1, visited1, [i, j], ["B"]);
        cnt1++;
      } else if (graph1[j][i] === "G" && !visited1[j][i]) {
        bfs(graph1, visited1, [i, j], ["G"]);
        cnt1++;
      }
    }
  }
  let cnt2 = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if ((graph2[j][i] === "R" || graph2[j][i] === "G") && !visited2[j][i]) {
        bfs(graph2, visited2, [i, j], ["R", "G"]);
        cnt2++;
      } else if (graph2[j][i] === "B" && !visited2[j][i]) {
        bfs(graph2, visited2, [i, j], ["B"]);
        cnt2++;
      }
    }
  }
  console.log(`${cnt1} ${cnt2}`);
};

solution(input);
