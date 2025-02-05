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
  const stack = [];
  const answer = [];
  for (let i = 1; i <= N; i++) {
    const [op, num] = input[i].split(" ").map(Number);
    switch (op) {
      case 1:
        stack.push(num);
        break;
      case 2:
        const el = stack.pop();
        answer.push(el ? el : -1);
        break;
      case 3:
        answer.push(stack.length);
        break;
      case 4:
        answer.push(stack.length > 0 ? 0 : 1);
        break;
      case 5:
        const peak = stack[stack.length - 1];
        answer.push(peak ? peak : -1);
    }
  }
  console.log(answer.join("\n"));
};

solution(input);
