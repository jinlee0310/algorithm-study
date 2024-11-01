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

const backtracking = (arr, k, answer = []) => {
  if (answer.length === k) {
    return [answer.join(" ")];
  }

  const result = [];
  for (let i = 0; i < arr.length; i++) {
    answer.push(arr[i]);
    result.push(...backtracking(arr.slice(i + 1), 6, answer));
    answer.pop();
  }
  return result;
};

const solution = (input) => {
  const answer = [];
  for (let testcase of input) {
    testcase = testcase.split(" ").map(Number);
    const k = testcase[0];
    const arr = testcase.slice(1);
    arr.sort((a, b) => a - b);
    const result = backtracking(arr, k);
    answer.push(result.join("\n"));
  }
  console.log(answer.join("\n\n"));
};

input.pop();
solution(input);
