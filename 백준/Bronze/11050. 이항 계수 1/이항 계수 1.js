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

const [N, K] = input.split(" ").map(Number);

let n = 1;
for (let i = K + 1; i <= N; i++) {
  n *= i;
}
let k = 1;
for (let i = 2; i <= N - K; i++) {
  k *= i;
}
console.log(Math.floor(n / k));
