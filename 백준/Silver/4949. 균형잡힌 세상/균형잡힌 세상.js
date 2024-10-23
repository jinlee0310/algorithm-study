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

const answer = [];

const solution = (str) => {
  const stack = [];
  for (let j = 0; j < str.length; j++) {
    if (stack.length === 0) {
      if (str[j] === "(" || str[j] === "[") {
        stack.push(str[j]);
      } else if (str[j] === ")" || str[j] === "]") {
        answer.push("no");
        return;
      }
    } else {
      if (str[j] === ")") {
        if (stack[stack.length - 1] === "(") {
          stack.pop();
        } else {
          answer.push("no");
          return;
        }
      } else if (str[j] === "]") {
        if (stack[stack.length - 1] === "[") {
          stack.pop();
        } else {
          answer.push("no");
          return;
        }
      } else if (str[j] === "(" || str[j] === "[") {
        stack.push(str[j]);
      }
    }
  }
  if (stack.length !== 0) {
    answer.push("no");
    return;
  } else {
    answer.push("yes");
    return;
  }
};
// input.pop();
for (let i = 0; i < input.length - 1; i++) {
  // console.log(input[i]);
  solution(input[i]);
}
console.log(answer.join("\n"));
