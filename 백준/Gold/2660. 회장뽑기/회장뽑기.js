const path = require("path");
const fs = require("fs");

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
  const n = graph.length;
  const dists = Array(n).fill(-1);
  dists[start] = 0;
  const queue = [start];

  while (queue.length) {
    const cur = queue.shift();

    for (let next of graph[cur]) {
      if (dists[next] === -1) {
        dists[next] = dists[cur] + 1;
        queue.push(next);
      }
    }
  }
  return Math.max(...dists);
};

const solution = (input) => {
  const n = Number(input[0]);
  const graph = Array.from({ length: n + 1 }, () => []);

  for (let i = 1; i < input.length - 1; i++) {
    const [a, b] = input[i].split(" ").map(Number);

    graph[a].push(b);
    graph[b].push(a);
  }

  const scores = Array(n + 1).fill(Infinity);
  for (let i = 1; i <= n; i++) {
    const score = bfs(graph, i);
    scores[i] = score;
  }

  const minScore = Math.min(...scores);
  const people = scores
    .map((v, idx) => (v === minScore ? idx : -1))
    .filter((v) => v > -1);

  console.log(`${minScore} ${people.length}`);
  console.log(people.join(" "));
};

solution(input);
