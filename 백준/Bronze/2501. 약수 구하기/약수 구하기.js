const path = require("path");
const fs = require("fs");

const [N, K] = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const getFactor = (N, K) => {
  let cnt = 0;
  for (let i = 1; i <= N; i++) {
    if (N % i === 0) {
      cnt++;
    }
    if (cnt === K) return i;
  }
  return 0;
};

console.log(getFactor(N, K));
