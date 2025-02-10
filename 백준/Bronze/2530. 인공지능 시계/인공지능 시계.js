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

const [H, M, S] = input[0].split(" ").map(Number);
const D = Number(input[1]);

// 현재 시간을 초 단위로 변환
let totalSeconds = H * 3600 + M * 60 + S + D;

// 다시 시, 분, 초로 변환
const newH = Math.floor(totalSeconds / 3600) % 24;
const newM = Math.floor(totalSeconds / 60) % 60;
const newS = totalSeconds % 60;

console.log(newH, newM, newS);