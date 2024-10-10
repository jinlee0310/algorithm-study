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
  const arr = [":fan::fan::fan:", `:fan::${input}::fan:`, ":fan::fan::fan:"];
  console.log(arr.join("\n"));
};

solution(input);
