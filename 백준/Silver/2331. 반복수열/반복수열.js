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

const solution = (input) => {
  const [A, P] = input.split(" ").map(Number);
  const arr = [A];

  let idx = 0;
  while (true) {
    let num = arr[arr.length - 1];
    let sum = 0;
    while (num >= 1) {
      sum += Math.pow(num % 10, P);
      num = Math.floor(num / 10);
    }
    if (arr.includes(sum)) {
      idx = arr.findIndex((v) => v === sum);
      break;
    }
    arr.push(sum);
  }
  console.log(idx);
};

solution(input);
