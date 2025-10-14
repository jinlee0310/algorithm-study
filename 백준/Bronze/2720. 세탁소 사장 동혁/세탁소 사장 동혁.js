const path = require("path");
const fs = require("fs");

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
  const T = Number(input[0]);
  for (let i = 1; i <= T; i++) {
    let num = Number(input[i]);
    const quarter = Math.floor(num / 25);
    num %= 25;
    const dime = Math.floor(num / 10);
    num %= 10;
    const nickel = Math.floor(num / 5);
    num %= 5;
    console.log(`${quarter} ${dime} ${nickel} ${num}`);
  }
};

solution(input);
