const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim();

const recursive = (n, m, cnt) => {
  if (n === m) {
    return cnt;
  }
  if (Number(n) > Number(m)) {
    return Infinity;
  }

  const doubleN = Number(n) * 2;
  const double = recursive(doubleN.toString(), m, cnt + 1);
  const appendOne = recursive(n + "1", m, cnt + 1);

  return Math.min(double, appendOne);
};

const solution = (input) => {
  const [n, m] = input.split(" ");

  const result = recursive(n, m, 1);
  console.log(result === Infinity ? -1 : result);
};

solution(input);
