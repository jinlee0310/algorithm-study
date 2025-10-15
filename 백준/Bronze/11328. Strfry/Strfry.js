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

const solution = (input) => {
  const n = Number(input[0]);
  const answer = [];
  for (let i = 1; i <= n; i++) {
    const [a, b] = input[i].split(" ").map((v) => v.split(""));
    if (a.length !== b.length) {
      answer.push("Impossible");
      continue;
    }
    let flag = true;
    for (let str of a) {
      if (b.includes(str)) {
        const idx = b.findIndex((v) => v === str);
        b.splice(idx, 1);
      } else {
        flag = false;
        break;
      }
    }
    if (b.length > 0) flag = false;
    if (flag) {
      answer.push("Possible");
    } else answer.push("Impossible");
  }
  console.log(answer.join("\n"));
};

solution(input);
