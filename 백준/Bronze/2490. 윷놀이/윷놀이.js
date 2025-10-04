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
  const answer = [];
  input.forEach((i) => {
    const cnt0 = i
      .split(" ")
      .map(Number)
      .filter((v) => v === 0).length;
    switch (cnt0) {
      case 0:
        answer.push("E");
        break;
      case 1:
        answer.push("A");
        break;
      case 2:
        answer.push("B");
        break;
      case 3:
        answer.push("C");
        break;
      case 4:
        answer.push("D");
        break;
    }
  });
  console.log(answer.join("\n"));
};

solution(input);
