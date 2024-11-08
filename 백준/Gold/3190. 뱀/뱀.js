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

const moving = (N, apples, operations) => {
  // 동남서북
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  let sec = 0;
  const snake = { size: [[0, 0]], dir: 0 };

  while (true) {
    sec++;
    let { size, dir } = snake;
    const nextX = size[size.length - 1][0] + directions[dir][0];
    const nextY = size[size.length - 1][1] + directions[dir][1];

    // 종료 조건
    if (
      0 > nextX ||
      0 > nextY ||
      N <= nextX ||
      N <= nextY ||
      size.find(([x, y]) => x === nextX && y === nextY)
    ) {
      return sec;
    }

    size.push([nextX, nextY]);

    // 사과
    const targetAppleIdx = apples.findIndex(
      ([y, x]) => x === nextX && y === nextY,
    );
    if (targetAppleIdx > -1) {
      apples.splice(targetAppleIdx, 1);
    } else {
      size.shift();
    }

    // 방향
    const op = operations.find(([num]) => num === sec);
    if (op) {
      if (op[1] === "L") {
        snake.dir = (4 + dir - 1) % 4;
      } else {
        snake.dir = (dir + 1) % 4;
      }
    }
    // console.log(size, dir, sec);
  }
};

const solution = (input) => {
  const N = Number(input[0]);
  const K = Number(input[1]);

  const apples = [];
  for (let i = 2; i <= K + 1; i++) {
    apples.push(input[i].split(" ").map((v) => Number(v) - 1));
  }

  const operations = [];
  operations.push(
    ...input
      .slice(K + 3)
      .map((v) => v.split(" "))
      .map((op) => [Number(op[0]), op[1]]),
  );
  // console.log(operations);
  // console.log(apples);
  console.log(moving(N, apples, operations));
};

solution(input);
