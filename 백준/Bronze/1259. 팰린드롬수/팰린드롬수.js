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
  for (let i = 0; i < input.length; i++) {
    const reverse = input[i].split("").reverse().join("");
    if (reverse === input[i]) {
      console.log("yes");
    } else {
      console.log("no");
    }
  }
};
input.pop();
solution(input);
