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
  let [n, k] = input[0].split(" ").map((v) => Number(v));
  const coins = [];
  for (let i = 1; i <= n; i++) {
    coins.push(Number(input[i]));
  }
  coins.sort((a, b) => b - a);
  let cnt = 0;

  while (k > 0) {
    // console.log(k);
    for (const coin of coins) {
      if (k % coin === 0) {
        cnt += 1;
        k -= coin;
        break;
      }
    }
  }
  console.log(cnt);
};

solution(input);
