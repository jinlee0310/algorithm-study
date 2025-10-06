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
  let cnt = 0;
  let sum = 0;
  const scores = {
    "A+": 4.5,
    A0: 4,
    "B+": 3.5,
    B0: 3.0,
    "C+": 2.5,
    C0: 2.0,
    "D+": 1.5,
    D0: 1.0,
    F: 0,
  };
  for (let line of input) {
    const [_, scholar, score] = line.split(" ");
    if (score !== "P") {
      sum += Number(scholar) * scores[score];
      cnt += Number(scholar);
    }
  }
  console.log((sum / cnt).toFixed(6));
};

solution(input);
