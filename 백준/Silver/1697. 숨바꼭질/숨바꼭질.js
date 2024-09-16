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

const bfs = (N, K) => {
  if (N === K) return 0; // 수빈이와 동생이 같은 위치에 있는 경우

  const MAX_POSITION = 100000;
  const visited = new Array(MAX_POSITION + 1).fill(false);
  const queue = [[N, 0]]; // [현재 위치, 시간]
  visited[N] = true;

  while (queue.length > 0) {
    const [current, time] = queue.shift();

    // 수빈이가 걷거나 순간이동할 수 있는 위치들
    const nextPositions = [current - 1, current + 1, current * 2];

    for (const next of nextPositions) {
      if (next === K) return time + 1; // 동생을 찾은 경우
      if (next >= 0 && next <= MAX_POSITION && !visited[next]) {
        visited[next] = true;
        queue.push([next, time + 1]);
      }
    }
  }
};

const solution = (input) => {
  const [s, e] = input.split(" ").map((v) => Number(v));
  console.log(bfs(s, e));
};

solution(input);
