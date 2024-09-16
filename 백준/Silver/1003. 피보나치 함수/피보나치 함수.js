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

const fibonacci = (n, counter) => {
  if (n === 0) {
    counter[0] += 1;
    return 0;
  } else if (n === 1) {
    counter[1] += 1;
    return 1;
  } else {
    return fibonacci(n - 1, counter) + fibonacci(n - 2, counter);
  }
};

const solution = (input) => {
  const n = Number(input[0]);
  for (let i = 1; i <= n; i++) {
    const number = Number(input[i]);
    const dp0 = new Array(number + 1).fill(0);
    const dp1 = new Array(number + 1).fill(0);
    dp0[0] = 1;
    dp0[1] = 0;
    dp1[0] = 0;
    dp1[1] = 1;
    for (let j = 2; j <= number; j++) {
      dp0[j] = dp0[j - 1] + dp0[j - 2];
      dp1[j] = dp1[j - 1] + dp1[j - 2];
    }
    console.log(`${dp0[number]} ${dp1[number]}`);
  }
};

solution(input);
