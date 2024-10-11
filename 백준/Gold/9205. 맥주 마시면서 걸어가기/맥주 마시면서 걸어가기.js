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

const bfs = (start, marts, end) => {
  const queue = [start];
  const locations = [start, ...marts, end];
  const visited = Array(locations.length).fill(false);
  const MAX_DIXTANCE = 20 * 50;

  while (queue.length) {
    const [x, y] = queue.shift();
    if (x === end[0] && y === end[1]) return true;

    for (let i = 0; i < locations.length; i++) {
      if (!visited[i]) {
        const [nx, ny] = locations[i];
        const distance = Math.abs(nx - x) + Math.abs(ny - y);

        if (distance <= MAX_DIXTANCE) {
          visited[i] = true;
          queue.push([nx, ny]);
        }
      }
    }
  }
  return false;
};

const solution = (input) => {
  const T = Number(input[0]);
  let idx = 1;
  for (let i = 0; i < T; i++) {
    const n = Number(input[idx]);
    idx++;
    const start = input[idx].split(" ").map(Number);
    idx++;
    const marts = [];
    for (let j = 0; j < n; j++) {
      marts.push(input[idx].split(" ").map(Number));
      idx++;
    }
    const end = input[idx].split(" ").map(Number);
    idx++;
    // console.log(start, marts, end);
    console.log(bfs(start, marts, end) ? "happy" : "sad");
  }
};

solution(input);
