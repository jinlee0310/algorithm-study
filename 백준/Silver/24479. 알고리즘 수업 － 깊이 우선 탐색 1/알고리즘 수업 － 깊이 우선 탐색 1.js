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

const solution = (input) => {
  const [N, M, R] = input[0].split(" ").map(Number);
  const graph = Array.from({ length: N + 1 }, () => []);
  for (let i = 1; i < input.length; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }
  for (let node of graph) {
    node.sort((a, b) => a - b);
  }

  const visited = Array(N + 1).fill(false);
  const answer = Array(N).fill(0);
  let cnt = 0;
  const dfs = (cur) => {
    cnt++;
    answer[cur - 1] = cnt;
    visited[cur] = true;

    for (let node of graph[cur]) {
      if (!visited[node]) {
        dfs(node);
      }
    }
  };
  dfs(R);
  console.log(answer.join("\n"));
};

solution(input);
