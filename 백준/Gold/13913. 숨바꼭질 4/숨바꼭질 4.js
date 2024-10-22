const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim();

const bfs = (st, en) => {
  const visited = Array(100001).fill(false);
  visited[st] = true;
  const from = Array(100001).fill(-1);
  const queue = [[st, 0]];

  let minTime = 0;

  while (queue.length) {
    const [cur, time] = queue.shift();
    if (cur === en) {
      minTime = time;
      break;
    }

    const move = [cur - 1, cur + 1, cur * 2];
    for (const next of move) {
      if (0 <= next && next <= 100001 && !visited[next]) {
        visited[next] = true;
        from[next] = cur;
        queue.push([next, time + 1]);
      }
    }
  }
  const path = [];
  for (let i = en; i !== -1; i = from[i]) {
    path.push(i);
  }
  path.reverse();

  return [minTime, path];
};

const solution = (input) => {
  const [st, en] = input.split(" ").map(Number);
  const [minTime, path] = bfs(st, en);
  console.log(minTime);
  console.log(path.join(" "));
};

solution(input);
