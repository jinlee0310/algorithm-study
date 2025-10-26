const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim();

const solution = (input) => {
  const [a, b, c, d, e, f] = input.split(" ").map(Number);

  for (let x = -999; x <= 999; x++) {
    for (let y = -999; y <= 999; y++) {
      if (a * x + b * y === c && d * x + e * y === f) {
        console.log(`${x} ${y}`);
        return;
      }
    }
  }
};

solution(input);
