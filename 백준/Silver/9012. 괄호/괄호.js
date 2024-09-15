const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .split("\n");

const isVPS = (str) => {
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      stack.push("(");
    } else {
      if (stack.length === 0) {
        return false;
      } else {
        if (stack[stack.length - 1] === "(") {
          stack.pop();
        }
      }
    }
  }
  if (stack.length !== 0) return false;
  return true;
};

const solution = (input) => {
  const n = Number(input[0]);
  for (let i = 1; i <= n; i++) {
    const str = input[i];
    console.log(isVPS(str) ? "YES" : "NO");
  }
};

solution(input);
