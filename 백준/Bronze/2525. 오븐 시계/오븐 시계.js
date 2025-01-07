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

let [H, M] = input[0].split(" ").map(Number);
const C = Number(input[1]);

const CH = Math.floor(C / 60);
const CM = C % 60;

if (M + CM >= 60) {
  H = H + Math.floor((M + CM) / 60);
  M = (M + CM) % 60;
} else {
  M = M + CM;
}
H = (H + CH) % 24;
console.log(`${H} ${M}`);
