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
  const n = Number(input[0]);
  const stack = [];
  for (let i = 1; i <= n; i++) {
    const [op, number] = input[i].split(" ");
    if (op === "push") {
      stack.push(Number(number));
    } else if (op === "top") {
      if (stack.length === 0) {
        console.log(-1);
      } else {
        console.log(stack[stack.length - 1]);
      }
    } else if (op === "size") {
      console.log(stack.length);
    } else if (op === "pop") {
      if (stack.length === 0) {
        console.log(-1);
      } else {
        console.log(stack.pop());
      }
    } else if (op === "empty") {
      console.log(stack.length === 0 ? 1 : 0);
    }
  }
};

solution(input);
