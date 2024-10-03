const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim();

const solution = (input) => {
  const [N, U, L] = input.split(" ").map((v) => Number(v));
  if (N >= 1000 && (U >= 8000 || L >= 260)) {
    console.log("Very Good");
  } else if (N >= 1000) {
    console.log("Good");
  } else {
    console.log("Bad");
  }
};

solution(input);
