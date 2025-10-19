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
const N = Number(input);

if (N === 1) {
  console.log(1);
} else {
  let layer = 1; // 현재 겹(층)
  let max = 1; // 현재 겹의 마지막 번호
  while (max < N) {
    max += 6 * layer; // 다음 겹을 추가하면 6*layer만큼 늘어남
    layer++;
  }
  console.log(layer);
}
