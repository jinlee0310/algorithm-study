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

const selectionSort = (arr, k) => {
  let cnt = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    let max = 0;
    let maxIdx = -1;
    for (let j = 0; j <= i; j++) {
      if (arr[j] > max) {
        max = arr[j];
        maxIdx = j;
      }
    }
    if (max !== arr[i]) {
      cnt++;
      if (cnt === k) return [max, arr[i]].sort((a, b) => a - b).join(" ");

      const temp = arr[i];
      arr[i] = max;
      arr[maxIdx] = temp;
    }
  }
  return -1;
};

const [n, k] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

const answer = selectionSort(arr, k);
console.log(answer);
