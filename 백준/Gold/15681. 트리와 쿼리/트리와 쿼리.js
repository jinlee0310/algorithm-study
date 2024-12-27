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

const dfs = (graph, cur, visited, subtreeSize) => {
  visited[cur] = true;
  subtreeSize[cur] = 1;

  for (let node of graph[cur]) {
    if (!visited[node]) {
      dfs(graph, node, visited, subtreeSize);
      subtreeSize[cur] += subtreeSize[node];
    }
  }
};

const solution = (input) => {
  const [N, R, Q] = input[0].split(" ").map(Number);

  const graph = Array.from({ length: N + 1 }, () => []);
  let lineIdx = 1;
  for (let i = 1; i < N; i++) {
    const [node1, node2] = input[lineIdx].split(" ").map(Number);
    graph[node1].push(node2);
    graph[node2].push(node1);
    lineIdx++;
  }

  const subtreeSize = Array(N + 1).fill(0);
  const visited = Array(N + 1).fill(false);

  // 루트 R에서 DFS 시작해 서브트리 크기 계산
  dfs(graph, R, visited, subtreeSize);

  const answer = [];

  // 쿼리 처리 (서브트리 크기 바로 조회)
  for (let i = 0; i < Q; i++) {
    const target = Number(input[lineIdx]);
    answer.push(subtreeSize[target]);
    lineIdx++;
  }

  console.log(answer.join("\n"));
};

solution(input);
