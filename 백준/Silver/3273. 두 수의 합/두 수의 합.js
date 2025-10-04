const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim()
  .split("\n");

const solution = (input) => {
  const n = Number(input[0]);
  const arr = input[1].split(" ").map(Number);
  const x = Number(input[2]);

  const temp = Array(x + 1).fill(false);

  let cnt = 0;
  for (let i = 0; i < n; i++) {
    if (temp[arr[i]]) cnt++;
    else {
      const rest = x - arr[i];
      temp[rest] = true;
    }
  }
  console.log(cnt);
};

solution(input);
