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
    const attach = combinations.map((combination) => [v, ...combination]);
    answer.push(...attach);
  });
  return answer;
};

const getChickenDistance = (homes, chickens) => {
  let distance = 0;

  homes.forEach(([x, y]) => {
    let minDist = Infinity;
    chickens.forEach((chicken) => {
      const dist = Math.abs(chicken[0] - x) + Math.abs(chicken[1] - y);
      minDist = Math.min(dist, minDist);
    });
    distance += minDist;
  });
  return distance;
};

const solution = (input) => {
  const [n, m] = input[0].split(" ").map((v) => Number(v));
  const graph = [];
  for (let i = 1; i <= n; i++) {
    graph.push(input[i].split(" ").map((v) => Number(v)));
  }
  const coords = [];
  const home = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (graph[j][i] === 2) {
        coords.push([i, j]);
      } else if (graph[j][i] === 1) {
        home.push([i, j]);
      }
    }
  }
  const combinations = combination(coords, m);
  let distance = Infinity;
  combinations.forEach((combination) => {
    distance = Math.min(distance, getChickenDistance(home, combination));
  });
  console.log(distance);
};

solution(input);
