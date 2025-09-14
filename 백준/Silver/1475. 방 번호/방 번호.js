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

const solution = (input) => {
  const arr = Array(9).fill(0);
  input.split("").forEach((num) => {
    if (num === "9") {
      arr[6]++;
    } else {
      arr[num]++;
    }
  });
  arr[6] = Math.ceil(arr[6] / 2);
  console.log(Math.max(...arr));
};

solution(input);
