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
  const arr = input.map((v, idx) => [Number(v), idx + 1]);
  arr.sort((a, b) => b[0] - a[0]);
  console.log(
    arr.filter((_, idx) => idx <= 4).reduce((acc, cur) => acc + cur[0], 0),
  );
  console.log(
    arr
      .filter((_, idx) => idx <= 4)
      .map((v) => v[1])
      .sort((a, b) => a - b)
      .join(" "),
  );
};

solution(input);
