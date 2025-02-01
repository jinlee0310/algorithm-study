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
  const arr = input.map((row) => row.split(" ").map(Number));
  let max = 0;
  let maxR, maxC;
  for (let r = 0; r < arr.length; r++) {
    for (let c = 0; c < arr[0].length; c++) {
      if (arr[r][c] >= max) {
        max = arr[r][c];
        maxR = r;
        maxC = c;
      }
    }
  }
  console.log(max);
  console.log(`${maxR + 1} ${maxC + 1}`);
};

solution(input);
