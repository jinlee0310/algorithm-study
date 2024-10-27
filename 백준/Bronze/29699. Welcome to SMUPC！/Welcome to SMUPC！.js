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
  const N = Number(input);
  const str = "WelcomeToSMUPC";
  const idx = (N - 1) % str.length;
  console.log(str[idx]);
};

solution(input);
