const fs = require("fs");
const path = require("path");

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
  const answer = input.map((v) => {
    const arr = v.split(" ").map(Number);
    const c = Math.max(...arr);
    const [a, b] = arr.filter((v) => v !== c);
    if (Math.pow(a, 2) + Math.pow(b, 2) === Math.pow(c, 2)) return "right";
    else return "wrong";
  });
  console.log(answer.join("\n"));
};

solution(input.slice(0, -1));
