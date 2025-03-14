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
  const N = Number(input[0]);
  const arr = input[1].split(" ").map(Number);

  let cnt = 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] <= arr[i]) {
      cnt++;
    }
  }
  console.log(cnt);
};

solution(input);
