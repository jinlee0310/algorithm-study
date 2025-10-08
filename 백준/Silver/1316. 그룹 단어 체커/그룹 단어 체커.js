const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim()
  .split("\n");

const isGroupWord = (str) => {
  const set = new Set();
  let word = str[0];
  set.add(word);
  for (let i = 1; i < str.length; i++) {
    if (str[i] !== word) {
      if (set.has(str[i])) {
        return false;
      } else {
        set.add(str[i]);
        word = str[i];
      }
    }
  }
  return true;
};

const solution = (input) => {
  const answer = input.slice(1).filter(isGroupWord).length;
  console.log(answer);
};

solution(input);
