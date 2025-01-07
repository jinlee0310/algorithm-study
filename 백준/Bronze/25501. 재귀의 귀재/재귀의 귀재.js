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

const recursion = (s, l, r, cnt) => {
  if (l >= r) return `1 ${cnt}`;
  else if (s[l] !== s[r]) return `0 ${cnt}`;
  else return recursion(s, l + 1, r - 1, cnt + 1);
};

const isPalindrome = (s) => {
  return recursion(s, 0, s.length - 1, 1);
};

const solution = (input) => {
  const n = Number(input[0]);

  const answer = [];
  for (let i = 1; i <= n; i++) {
    answer.push(isPalindrome(input[i]));
  }
  console.log(answer.join("\n"));
};

solution(input);
