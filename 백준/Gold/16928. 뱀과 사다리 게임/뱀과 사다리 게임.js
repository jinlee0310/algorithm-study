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
  const [N, M] = input[0].split(" ").map(Number);
  const laddersAndSnakes = new Map();
  const visited = Array(101).fill(false);

  // 사다리와 뱀 정보 저장
  for (let i = 1; i <= N + M; i++) {
    const [start, end] = input[i].split(" ").map(Number);
    laddersAndSnakes.set(start, end);
  }

  const bfs = () => {
    const queue = [[1, 0]]; // [현재 위치, 이동 횟수]
    visited[1] = true;

    while (queue.length) {
      const [current, moves] = queue.shift();

      if (current === 100) return moves;

      for (let dice = 1; dice <= 6; dice++) {
        let next = current + dice;

        if (next > 100) continue;

        if (laddersAndSnakes.has(next)) {
          next = laddersAndSnakes.get(next); // 사다리 또는 뱀 타기
        }

        if (!visited[next]) {
          visited[next] = true;
          queue.push([next, moves + 1]);
        }
      }
    }
  };

  console.log(bfs());
};

solution(input);