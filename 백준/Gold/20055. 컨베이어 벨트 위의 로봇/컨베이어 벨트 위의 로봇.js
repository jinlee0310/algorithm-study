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

const rotateBelt = (belt) => {
  const last = belt[0].pop();
  belt[1].push(last);
  const first = belt[1].shift();
  belt[0].unshift(first);
};

const isFinish = (belt, K) => {
  let cnt = 0;
  for (const row of belt) {
    for (const el of row) {
      if (el.durability === 0) cnt++;
    }
  }
  if (cnt >= K) return true;
  else return false;
};

const rotateRobot = (belt) => {
  for (let i = belt[0].length - 2; i >= 0; i--) {
    if (belt[0][i].robot) {
      if (!belt[0][i + 1].robot && belt[0][i + 1].durability > 0) {
        belt[0][i].robot = false;
        belt[0][i + 1].robot = true;
        belt[0][i + 1].durability--;
      }
    }
  }
};

const unload = (belt) => {
  const N = belt[0].length;
  if (belt[0][N - 1].robot) {
    belt[0][N - 1].robot = false;
  }
};

const solution = (input) => {
  const [N, K] = input[0].split(" ");
  const belt = [];
  const arr = input[1].split(" ").map(Number);
  belt.push(
    arr.slice(0, N).map((durability) => ({ robot: false, durability })),
  );
  belt.push(
    arr
      .slice(N)
      .reverse()
      .map((durability) => ({ robot: false, durability })),
  );
  // console.log(belt);
  let step = 0;

  while (true) {
    if (isFinish(belt, K)) break;
    step++;
    rotateBelt(belt);
    unload(belt);
    rotateRobot(belt);
    unload(belt);
    if (belt[0][0].durability > 0) {
      belt[0][0].robot = true;
      belt[0][0].durability--;
    }
    unload(belt);
    // console.log(belt);
  }
  console.log(step);
};

solution(input);
