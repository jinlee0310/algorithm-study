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
  const answer = [];
  for (let i = 1; i <= n; i++) {
    const arr = Array(26).fill(0);
    const str = input[i];
    for (let j = 0; j < str.length; j++) {
      if (str[j] !== " ") {
        const askii = str[j].charCodeAt(0);
        arr[askii - 97] += 1;
      }
    }
    const max = Math.max(...arr);
    const cnt = arr.filter((v) => v === max).length;
    if (cnt > 1) {
      // console.log("?");
      answer.push("?");
    } else {
      const idx = arr.findIndex((v) => v === max);
      // console.log(String.fromCharCode(idx + 97));
      answer.push(String.fromCharCode(idx + 97));
    }
  }
  console.log(answer.join("\n"));
};

solution(input);
